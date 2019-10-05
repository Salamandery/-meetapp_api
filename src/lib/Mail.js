import exphbs from 'express-handlebars';
import nodemailerhbs from 'nodemailer-express-handlebars';
import { resolve } from 'path';
import nodemailer from 'nodemailer';
// Configurações do mail
import conf from '../config/mail';

class Mail {
    constructor() {
        const { host, port, secure, auth } = conf;
        this.transporter = nodemailer.createTransport({
            host,
            port,
            secure,
            auth: auth.user ? auth : null,
        });

        this.configTemplate();
    }

    configTemplate() {
        const viewPath = resolve(__dirname, '..', 'app', 'views', 'email');

        this.transporter.use(
            'compile',
            nodemailerhbs({
                viewEngine: exphbs.create({
                    layoutsDir: resolve(viewPath, 'layouts'),
                    partialsDir: resolve(viewPath, 'partials'),
                    defaultLayout: 'default',
                }),
                viewPath,
            })
        );
    }

    sendMail(message) {
        return this.transporter.sendMail({
            ...conf.default,
            ...message,
        });
    }
}

export default new Mail();
