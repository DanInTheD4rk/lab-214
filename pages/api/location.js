import prisma from "../../prisma/prisma"

export default async (req, res) => {
	switch (req.method) {
		case "GET": {
			const locations = await prisma.location.findMany()
			res.status(200).json(locations)
			break
		}
		case "POST": {
			await prisma.location.create({
				data: {
					userId: req.body.userId,
					longitude: req.body.longitude,
					latitude: req.body.latitude,
					imageUrl: req.body.imageUrl,
				},
			})
			res.status(200)
			break
		}
		case "DELETE": {
			await prisma.location.delete({
				where: {
					userId: req.body.userId,
				},
			})
			res.status(204)
			break
		}
	}
}
