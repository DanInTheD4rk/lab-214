/** @type {import('next').NextConfig} */
require("dotenv").config()

const ALCHEMY_ID = process.env.ALCHEMY_ID
// const MUTANT_CONTRACT = process.env.MUTANT_CONTRACT
// const BASE_URL = process.env.BASE_URL
// const TEST_CONTRACT = process.env.TEST_CONTRACT

const nextConfig = {
	reactStrictMode: false,
	swcMinify: true,
	env: {
		ALCHEMY_ID: process.env.ALCHEMY_ID,
		// MUTANT_CONTRACT: process.env.MUTANT_CONTRACT,
		// BASE_URL: process.env.BASE_URL,
	},
}

module.exports = nextConfig
