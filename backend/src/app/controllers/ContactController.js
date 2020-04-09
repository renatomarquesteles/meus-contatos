import { Op } from 'sequelize';
import * as Yup from 'yup';

import Contact from '../models/Contact';
import File from '../models/File';
import Phone from '../models/Phone';

class ContactController {
  async index(req, res) {
    const { name = '' } = req.query;

    const contacts = await Contact.findAll({
      where: {
        name: {
          [Op.like]: `%${name}%`,
        },
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
      ],
    });

    return res.json(contacts);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email(),
      phones: Yup.array().of(Yup.string()),
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
    });

    const { phones } = req.body;

    const promises = phones.map(async (phone) => {
      await Phone.create({
        contact_id: contact.id,
        phone_number: phone,
      });
    });

    await Promise.all(promises);

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
      ],
    });

    return res.json(newContact);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      phones: Yup.array().of(Yup.string()),
      avatar_id: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const contact = await Contact.findByPk(req.params.id);

    if (!contact) {
      return res.status(400).json({ error: 'Contact not found' });
    }

    const { phones } = req.body;

    if (phones) {
      await Phone.destroy({ where: { contact_id: contact.id } });

      const promises = phones.map(async (phone) => {
        await Phone.create({
          contact_id: contact.id,
          phone_number: phone,
        });
      });

      await Promise.all(promises);
    }

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
      ],
    });

    return res.json(updatedContact);
  }

  async delete(req, res) {
    const contact = await Contact.findByPk(req.params.id);

    if (!contact) {
      return res.status(400).json({ error: 'Contact not found' });
    }

    await Phone.destroy({ where: { contact_id: contact.id } });
    contact.destroy();

    return res.status(204).send();
  }
}

export default new ContactController();
