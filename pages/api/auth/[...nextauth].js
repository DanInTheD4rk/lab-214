import NextAuth from "next-auth"
import DiscordProvider from "next-auth/providers/discord"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
const scope = ["identify", "guilds", "guilds.members.read"].join(" ")
const roles = ["1035583655772426320", "1035583944650924032", "892046947303714867"] // gen, baby, mutant

export default NextAuth({
	adapter: PrismaAdapter(prisma),
	callbacks: {
		async signIn({ user, account, profile, email, credentials }) {
			let isHolder = false
			const access_token = account.access_token
			// kaiju kingz server
			await fetch("https://discordapp.com/api/users/@me/guilds/890466570575429703/member", {
				headers: {
					Authorization: "Bearer " + access_token,
					"Content-Type": "application/json",
				},
			})
				.then((resp) => resp.json())
				.then((data) => {
					console.log(data)
					isHolder = data.roles.some((role) => roles.includes(role))
				})
			return isHolder || "/error/noRoles"
		},
	},
	providers: [
		DiscordProvider({
			clientId: process.env.DISCORD_CLIENT_ID,
			clientSecret: process.env.DISCORD_CLIENT_SECRET,
			authorization: { params: { scope: scope } },
			profile(profile) {
				if (profile.avatar === null) {
					const defaultAvatarNumber = parseInt(profile.discriminator) % 5
					profile.image_url = `https://cdn.discordapp.com/embed/avatars/${defaultAvatarNumber}.png`
				} else {
					const format = profile.avatar.startsWith("a_") ? "gif" : "png"
					profile.image_url = `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.${format}`
				}
				return {
					id: profile.id,
					name: profile.username,
					email: profile.email,
					image: profile.image_url,
				}
			},
		}),
	],
	database: process.env.DATABASE_URL,
	secret: process.env.SECRET_KEY_OPENSSL,
})
