import prisma from "../../../prisma/prisma"

export default async (req, res) => {
	switch (req.method) {
		case "GET": {
			const query = req.query
			const { userId } = query
			const user = await prisma.user.findUnique({
				where: {
					id: userId,
				},
			})
			res.status(200).json(user).end()
			break
		}
	}
}
