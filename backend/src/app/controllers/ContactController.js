import { Op } from 'sequelize';
import * as Yup from 'yup';

import Address from '../models/Address';
import Contact from '../models/Contact';
import File from '../models/File';
import Phone from '../models/Phone';

class ContactController {
  async show(req, res) {
    const { id } = req.params;

    const contact = await Contact.findByPk(id, {
      attributes: ['id', 'name', 'email'],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['path', 'url'],
        },
        {
          model: Phone,
          as: 'phones',
          attributes: ['phone_number'],
        },
        {
          model: Address,
          as: 'addresses',
          attributes: [
            'zipcode',
            'city',
            'state',
            'neighborhood',
            'street',
            'number',
            'complement',
          ],
        },
      ],
    });

    if (!contact || contact.id !== req.userId) {
      return res.status(400).json({ error: 'Contact not found' });
    }

    return res.json(contact);
  }

  async index(req, res) {
    const { name = '' } = req.query;

    const contacts = await Contact.findAll({
      where: {
        name: {
          [Op.like]: `%${name}%`,
        },
        user_id: req.userId,
      },
      order: [['name', 'ASC']],
      attributes: ['id', 'name', 'email'],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['path', 'url'],
        },
        {
          model: Phone,
          as: 'phones',
          attributes: ['phone_number'],
        },
        {
          model: Address,
          as: 'addresses',
          attributes: [
            'zipcode',
            'city',
            'state',
            'neighborhood',
            'street',
            'number',
            'complement',
          ],
        },
      ],
    });

    return res.json(contacts);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email(),
      phones: Yup.array().of(Yup.string().min(14).max(15)),
      addresses: Yup.array().of(
        Yup.object().shape({
          zipcode: Yup.string().required(),
          city: Yup.string().required(),
          state: Yup.string().max(2).required(),
          neighborhood: Yup.string().required(),
          street: Yup.string().required(),
          number: Yup.number().required(),
          complement: Yup.string(),
        })
      ),
      avatar_id: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const { name, email, avatar_id } = req.body;

    const contact = await Contact.create({
      name,
      email,
      avatar_id,
      user_id: req.userId,
    });

    const { addresses, phones } = req.body;
    let phonesPromises = [];
    let addressesPromises = [];

    if (phones) {
      phonesPromises = phones.map(async (phone) => {
        await Phone.create({
          contact_id: contact.id,
          phone_number: phone,
        });
      });
    }

    if (addresses) {
      addressesPromises = addresses.map(async (address) => {
        await Address.create({
          contact_id: contact.id,
          zipcode: address.zipcode,
          city: address.city,
          state: address.state,
          neighborhood: address.neighborhood,
          street: address.street,
          number: address.number,
          complement: address.complement,
        });
      });
    }

    await Promise.all([...addressesPromises, ...phonesPromises]);

    const newContact = await Contact.findByPk(contact.id, {
      attributes: ['id', 'name', 'email'],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['path', 'url'],
        },
        {
          model: Phone,
          as: 'phones',
          attributes: ['phone_number'],
        },
        {
          model: Address,
          as: 'addresses',
          attributes: [
            'zipcode',
            'city',
            'state',
            'neighborhood',
            'street',
            'number',
            'complement',
          ],
        },
      ],
    });

    return res.json(newContact);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      phones: Yup.array().of(Yup.string()),
      addresses: Yup.array().of(
        Yup.object().shape({
          zipcode: Yup.string().required(),
          city: Yup.string().required(),
          state: Yup.string().max(2).required(),
          neighborhood: Yup.string().required(),
          street: Yup.string().required(),
          number: Yup.number().required(),
          complement: Yup.string(),
        })
      ),
      avatar_id: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const contact = await Contact.findByPk(req.params.id);

    if (!contact || contact.id !== req.userId) {
      return res.status(400).json({ error: 'Contact not found' });
    }

    const { addresses, phones } = req.body;
    let phonesPromises = [];
    let addressesPromises = [];

    if (phones) {
      await Phone.destroy({ where: { contact_id: contact.id } });

      phonesPromises = phones.map(async (phone) => {
        await Phone.create({
          contact_id: contact.id,
          phone_number: phone,
        });
      });
    }

    if (addresses) {
      await Address.destroy({ where: { contact_id: contact.id } });

      addressesPromises = addresses.map(async (address) => {
        await Address.create({
          contact_id: contact.id,
          zipcode: address.zipcode,
          city: address.city,
          state: address.state,
          neighborhood: address.neighborhood,
          street: address.street,
          number: address.number,
          complement: address.complement,
        });
      });
    }

    await Promise.all([...addressesPromises, ...phonesPromises]);

    await contact.update(req.body);

    const updatedContact = await Contact.findByPk(req.params.id, {
      attributes: ['id', 'name', 'email'],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['path', 'url'],
        },
        {
          model: Phone,
          as: 'phones',
          attributes: ['phone_number'],
        },
        {
          model: Address,
          as: 'addresses',
          attributes: [
            'zipcode',
            'city',
            'state',
            'neighborhood',
            'street',
            'number',
            'complement',
          ],
        },
      ],
    });

    return res.json(updatedContact);
  }

  async delete(req, res) {
    const contact = await Contact.findByPk(req.params.id);

    if (!contact) {
      return res.status(400).json({ error: 'Contact not found' });
    }

    if (contact.id !== req.userId) {
      return res
        .status(401)
        .json({ error: 'Cannot delete another user contact' });
    }

    await Phone.destroy({ where: { contact_id: contact.id } });
    await Address.destroy({ where: { contact_id: contact.id } });
    contact.destroy();

    return res.status(204).send();
  }
}

export default new ContactController();
