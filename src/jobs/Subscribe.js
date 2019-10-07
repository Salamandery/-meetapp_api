// Email
import Mail from '../lib/Mail';

class Subscribe {
    get key() {
        return 'Subscribe';
    }

    async handle({ data }) {
        console.log('Processo em execução');

        const { Exists, formattedDate, username } = data;
        const res = await Mail.sendMail({
            to: `${Exists.name} ${Exists.email}`,
            subject: 'Um novo inscrito em seu Evento!!',
            template: 'subscribe',
            context: {
                name: Exists.name,
                date: formattedDate,
                user: username,
            },
        });
        console.log(`Email enviado \n${res.response}`);
    }
}

export default new Subscribe();
