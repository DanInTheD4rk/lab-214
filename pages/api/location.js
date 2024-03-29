import prisma from "prisma/prisma"
import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from "../api/auth/[...nextauth]"
import failedLogo from "public/icons/failed.png"
import ImageKit from "imagekit"

export default async (req, res) => {
	const session = await unstable_getServerSession(req, res, authOptions)

	if (session) {
		switch (req.method) {
			case "GET": {
				const locations = await prisma.location.findMany({
					select: {
						userId: true,
						longitude: true,
						latitude: true,
						imageUrl: true,
						user: {
							select: {
								name: true,
							},
						},
					},
				})
				res.status(200).json(locations)
				break
			}
			case "POST": {
				let imagekit
				let data = {
					userId: req.body.userId,
					longitude: randomizeLocation(req.body.longitude),
					latitude: randomizeLocation(req.body.latitude),
					imageUrl: failedLogo.src,
				}
				try {
					imagekit = new ImageKit({
						publicKey: process.env.IMAGEKIT_PUBLIC,
						privateKey: process.env.IMAGEKIT_PRIVATE,
						urlEndpoint: process.env.IMAGEKIT_URL,
					})
				} catch (err) {
					console.error(err)
				}
				if (imagekit) {
					await new Promise((resolve, reject) =>
						imagekit.upload(
							{
								file: req.body.imageUrl,
								fileName: req.body.userId,
								useUniqueFileName: false,
							},
							async (error, result) => {
								if (error) {
									console.log(error)
									reject()
								}
								resolve(result.url)
							}
						)
					).then(async (url) => {
						data.imageUrl = url
						await prisma.location.create({
							data: data,
						})
					})
				} else {
					await prisma.location.create({
						data: data,
					})
				}
				res.status(200).end()
				break
			}
			case "DELETE": {
				await prisma.location.delete({
					where: {
						userId: req.body.userId,
					},
				})
				res.status(204).end()
				break
			}
		}
	} else {
		res.status(401).end()
	}
}

const randomizeLocation = (loc) => {
	let rand = Math.random() / 10
	if (Math.floor(Math.random() * 10) % 2 === 0) {
		rand = rand * -1
	}
	return loc + rand
}
