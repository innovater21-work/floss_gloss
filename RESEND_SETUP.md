# Resend form delivery setup

## What is wired up

- The contact and appointment-request forms submit to server-side Next.js routes.
- The server sends each email through Resend to the clinic email in `src/content/site.json`.
- A visitor's valid email is used as `Reply-To`; the visitor cannot choose the recipient or sender.
- The API key stays server-side in `.env.local` and is never included in browser code.
- The app does not save submissions in a database. Resend processes the email, and a successful request only confirms that Resend accepted it.
- An appointment request is not a confirmed booking and does not reserve a KiviHealth slot.

## Local setup

1. Create an API key in your Resend account.
2. Open `.env.local` in the app root and paste the key after `RESEND_API_KEY=`.
3. Restart the Next.js dev server so it loads the environment file.
4. Submit the contact or appointment-request form. Check the Resend dashboard and the clinic inbox.

The clinic inbox is already configured as `drarchanamal@gmail.com`. The default sender is Resend's `onboarding@resend.dev` test sender so the code is ready without another code edit.

## Sender verification before production

Resend requires a sending domain you own to be added and verified before sending from your own clinic address. In the Resend dashboard, add a clinic-owned domain and publish the DNS records Resend provides. After verification, set `RESEND_FROM_EMAIL` in `.env.local` and in the production hosting environment to an address at that verified domain, for example:

```env
RESEND_FROM_EMAIL="Floss & Gloss <appointments@floss-gloss.in>"
```

For this clinic, use `appointments@floss-gloss.in` after `floss-gloss.in` is verified in the Resend account. As of 2026-10-06, a read-only check using the supplied API key succeeded, but that account did not list `floss-gloss.in` as a configured domain. No real email was sent during the check. If the Resend account restricts test sending to an account-owned/verified recipient, the test sender may not deliver to the clinic inbox until sender setup is complete. The UI will show a safe error and will not claim the message was sent.

For deployment, add `RESEND_API_KEY` and `RESEND_FROM_EMAIL` to the host's server-side environment settings. Do not commit `.env.local`, and do not rename the secret with a `NEXT_PUBLIC_` prefix.
