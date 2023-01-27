# Setup

Clone repo: https://github.com/DanInTheD4rk/lab-214.git

Run `yarn install`

Create a new file ".env" in the base directory and copy the contents of ".env.template" into it

---

The following values need to be set in the .env file:

<ul>
<li>NEXT_PUBLIC_ALCHEMY_ID</li>
<li>NEXT_PUBLIC_MAPBOX</li>
<li>DISCORD_CLIENT_SECRET</li>
<li>DISCORD_CLIENT_ID</li>
<li>SECRET_KEY_OPENSSL</li>
</ul>

## Alchemy

Sign in with google or create account at: https://dashboard.alchemy.com/

In the navbar, click on the "Apps" dropdown and create an app

In the created app, select "View Key" and copy the api key to "NEXT_PUBLIC_ALCHEMY_ID"

## Mapbox

Sign up for account at: https://account.mapbox.com/

Copy the default token and set to "NEXT_PUBLIC_MAPBOX"

## Discord

Login with discord and create new application here: https://discord.com/developers/applications

In your app dashboard, go to Settings > OAuth2 > General

Reset secret and copy the secret to the "DISCORD_CLIENT_SECRET" and "CLIENT ID" to the "DISCORD_CLIENT_ID" fields in the .env

Under "Redirects", add:
http://localhost:3000/api/auth/callback/discord

## NextAuth

Run `openssl rand -base64 32` in terminal and set value to "SECRET_KEY_OPENSSL"

---

These values are optional to set in .env but some functionality will be reduced

<ul>
<li>IMAGEKIT_PRIVATE</li>
<li>IMAGEKIT_PUBLIC</li>
<li>IMAGEKIT_URL</li>
</ul>

## ImageKit

> Skipping setting these values will result in a placeholder image being used for markers in the locator lab

Signup for free at https://imagekit.io/dashboard

Use the url endpoint, public key, and private key values in the Developer options section of the dashboard

---

<br/>

## Local Database Setup

_Original guide here: https://supabase.com/docs/guides/resources/supabase-cli/local-development_

### Prerequisites:

<ul>
	<li>Docker</li>
	<li>git</li>
	<li>Supabase CLI (should be installed from dev dependencies)</li>
</ul>
<br/>

Create supabase account and generate an access token from: https://app.supabase.com/account/tokens

Run in base directory: `yarn supabase init`

Make sure docker is running and run `yarn supabase start`

<br/><br/>

_Questions? Drop by the [Kaiju Kingz](URL "https://discord.gg/kaiju-kingz") discord and drop them in the #Developer channel_
