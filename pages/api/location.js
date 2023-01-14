import prisma from "prisma/prisma"
import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from "../api/auth/[...nextauth]"

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
				await prisma.location.create({
					data: {
						userId: req.body.userId,
						longitude: randomizeLocation(req.body.longitude),
						latitude: randomizeLocation(req.body.latitude),
						imageUrl: req.body.imageUrl,
					},
				})
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
