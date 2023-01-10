import kkServer from "../../public/kkServer.png"
import discordLogo from "../../public/discordLogo.png"
import twitterLogo from "../../public/twitterLogo.png"
import { COMMUNITIES } from "../../constants/communities"

const Communities = () => {
	return (
		<div className="text-white flex flex-row justify-center whitespace-nowrap">
			<div>
				{COMMUNITIES.map((com) => (
					<div className="mx-4 my-2">{com.location}:</div>
				))}
			</div>

			<div>
				{COMMUNITIES.map((com) => (
					<div className="mx-2 my-2">
						{com.kaijuChannel ? (
							<a href={com.kaijuChannel}>
								<img className="h-6 rounded-full" src={kkServer.src} />
							</a>
						) : (
							<br />
						)}
					</div>
				))}
			</div>

			<div>
				{COMMUNITIES.map((com) => (
					<div className="mx-2 my-2">
						{com.twitter ? (
							<a href={com.twitter}>
								<img className="h-6 rounded-full" src={twitterLogo.src} />
							</a>
						) : (
							<br />
						)}
					</div>
				))}
			</div>

			<div className="items-center">
				{COMMUNITIES.map((com) => (
					<div className="mx-2 my-2">
						{com.discord ? (
							<a href={com.discord}>
								<img className="h-6 rounded-full" src={discordLogo.src} />
							</a>
						) : (
							<br />
						)}
					</div>
				))}
			</div>
		</div>
	)
}

export default Communities
