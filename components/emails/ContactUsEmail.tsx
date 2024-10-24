import * as React from 'react';
import {
    Body,
    Button,
    Container,
    Head,
    Heading,
    Hr,
    Html,
    Preview,
    Section,
    Text,
    Link,
} from '@react-email/components';

interface EmailTemplateProps {
    organisation: string;
    name: string;
    email: string;
    message: string;
}

export const ContactUsEmail: React.FC<Readonly<EmailTemplateProps>> = ({
    organisation,
    name,
    email,
    message
}) => (
    <Html>
        <Head />
        <Preview>New contact form submission from {name}</Preview>
        <Body style={main}>
            <Container style={container}>
                <Heading style={h1}>New Contact Form Submission</Heading>
                <Section style={detailsSection}>
                    <Text style={detailHeading}>Contact Details:</Text>
                    <Text style={detailText}>
                        <strong>Name:</strong> {truncateText(name, 30)}
                    </Text>
                    <Text style={detailText}>
                        <strong>Organisation:</strong> {truncateText(organisation, 30)}
                    </Text>
                    <Text style={detailText}>
                        <strong>Email:</strong> <Link href={`mailto:${email}`} style={emailLink}>{truncateText(email, 30)}</Link>
                    </Text>
                    <Text style={detailText}>
                        <strong>Message:</strong>
                    </Text>
                    <Text style={messageText}>{message}</Text>
                </Section>
                <Button style={button} href={`mailto:${email}`}>
                    Reply to {name.split(' ')[0]}
                </Button>
                <Hr style={hr} />
                <Text style={footerText}>
                    This email was sent from your website`s contact form.
                </Text>
            </Container>
        </Body>
    </Html>
);

const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? text.substring(0, maxLength - 3) + '...' : text;
};

export default ContactUsEmail;

const main = {
    backgroundColor: '#1f2937',
    fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
    padding: '40px 0',
};

const container = {
    backgroundColor: '#111827',
    borderRadius: '8px',
    margin: '0 auto',
    padding: '40px 0',
    width: '100%',
    maxWidth: '600px',
};

const h1 = {
    color: '#f3f4f6',
    fontSize: '24px',
    fontWeight: 'bold',
    lineHeight: '24px',
    padding: '0 48px',
    textAlign: 'center' as const,
    margin: '0 0 40px',
};

const detailsSection = {
    backgroundColor: '#1e293b',
    borderRadius: '4px',
    margin: '0 0 24px',
    padding: '24px',
};

const messageSection = {
    margin: '0 48px 24px',
    padding: '0',
};

const detailHeading = {
    color: '#f3f4f6',
    fontSize: '18px',
    fontWeight: 'bold',
    margin: '0 0 12px',
};

const detailText = {
    color: '#d1d5db',
    fontSize: '14px',
    lineHeight: '24px',
    margin: '0 0 4px',
};

const messageText = {
    color: '#d1d5db',
    fontSize: '14px',
    lineHeight: '24px',
    margin: '8px 0 0',
    whiteSpace: 'pre-wrap' as const,
};

const button = {
    backgroundColor: '#3b82f6',
    borderRadius: '4px',
    color: '#fff',
    fontSize: '16px',
    fontWeight: 'bold',
    textDecoration: 'none',
    textAlign: 'center' as const,
    display: 'block',
    width: 'auto',
    padding: '12px 24px',
    margin: '32px auto 0',
};

const footerText = {
    color: '#6b7280',
    fontSize: '12px',
    lineHeight: '16px',
    padding: '0 48px',
    textAlign: 'center' as const,
    margin: '24px 0 0',
};

const hr = {
    borderColor: '#374151',
    margin: '32px 0',
};

const emailLink = {
    color: '#60a5fa',
    textDecoration: 'none',
};