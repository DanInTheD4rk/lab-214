import prisma from "../../prisma/prisma"

export default async (req, res) => {
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
					longitude: req.body.longitude,
					latitude: req.body.latitude,
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
}
