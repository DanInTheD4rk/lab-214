import prisma from "../../prisma/prisma"

export default async (req, res) => {
	switch (req.method) {
		case "GET": {
			const locations = await prisma.location.findMany()
			res.status(200).json(locations)
			break
		}
		case "POST": {
			await prisma.location.upsert({
				where: {
					userId: req.body.userId,
				},
				update: {
					longitude: req.body.longitude,
					latitude: req.body.latitude,
					imageUrl: req.body.imageUrl,
				},
				create: {
					userId: req.body.userId,
					longitude: req.body.longitude,
					latitude: req.body.latitude,
					imageUrl: req.body.imageUrl,
				},
			})
			res.status(200)
			break
		}
	}
}
