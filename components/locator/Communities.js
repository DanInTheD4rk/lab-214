import kkServer from "public/icons/kkServer.png"
import discordLogo from "public/icons/discordLogo.png"
import twitterLogo from "public/icons/twitterLogo.png"
import telegramLogo from "public/icons/telegramLogo.png"
import { COMMUNITIES } from "constants/communities"

const Communities = () => {
	return (
		<div className="text-white flex flex-row justify-center whitespace-nowrap">
			<div>
				{COMMUNITIES.map((com) => (
					<div key={com.location} className="text-sm ml-2 mr-2 my-2">
						{com.location}:
					</div>
				))}
			</div>

			<div className="mt-1">
				{COMMUNITIES.map((com) => (
					<div key={com.location} className="mr-2 my-[4px]">
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

			<div className="mt-1">
				{COMMUNITIES.map((com) => (
					<div key={com.location} className="mr-2 my-[4px]">
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

			<div className="items-center mt-1">
				{COMMUNITIES.map((com) => (
					<div key={com.location} className="mr-2 my-[4px]">
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

			<div className="items-center mt-1">
				{COMMUNITIES.map((com) => (
					<div key={com.location} className="my-[4px]">
						{com.telegram ? (
							<a href={com.telegram}>
								<img className="h-6 rounded-full" src={telegramLogo.src} />
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
