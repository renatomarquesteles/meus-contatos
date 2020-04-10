import Mail from '../../lib/Mail';

class NewUserEmail {
  get key() {
    return 'NewUserEmail';
  }

  async handle({ data }) {
    const { name, email } = data;

    await Mail.sendMail({
      to: `${name} <${email}>`,
      subject: 'Bem-vindo!',
      template: 'newUser',
      context: { name },
    });
  }
}

export default new NewUserEmail();
