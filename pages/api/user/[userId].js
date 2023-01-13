import prisma from "prisma/prisma"

export default async (req, res) => {
	switch (req.method) {
		case "GET": {
			const query = req.query
			const { userId } = query
			const user = await prisma.user.findUnique({
				where: {
					id: userId,
				},
				select: {
					id: true,
					name: true,
					image: true,
				},
			})
			res.status(200).json(user)
			break
		}
	}
}
