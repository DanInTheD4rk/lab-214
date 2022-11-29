/** @type {import('next').NextConfig} */
require("dotenv").config()

const ALCHEMY_ID = process.env.ALCHEMY_ID

const nextConfig = {
	reactStrictMode: false,
	swcMinify: true,
	env: {
		ALCHEMY_ID: process.env.ALCHEMY_ID,
	},
}

module.exports = nextConfig
