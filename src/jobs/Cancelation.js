// Email
import Mail from '../lib/Mail';

class Cancelation {
    get key() {
        return 'Cancelation';
    }

    async handle({ data }) {
        console.log('Processo em execução');

        const { Exists, formattedDate } = data;
        const res = await Mail.sendMail({
            to: `${Exists.provider.name} ${Exists.provider.email}`,
            subject: 'Evento cancelado!!',
            template: 'cancelation',
            context: {
                name: Exists.name,
                date: formattedDate,
            },
        });
        console.log(`Email enviado \n${res.response}`);
    }
}

export default new Cancelation();
