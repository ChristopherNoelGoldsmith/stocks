///stock/profile2?symbol=AAPL
import styles from "./Profile.module.scss";
const Profile = (props) => {
	const { earningsData, profileData } = props;
	return (
		<section className={styles["company-details"]}>
			<section>
				<ul>
					<li>{`${profileData.finnhubIndustry} - (${profileData.country})`}</li>
					<li>{`WEBSITE: ${profileData.weburl}`}</li>
					<li>{`IPO: ${profileData.ipo}`}</li>
					<li>{`Market Cap: ${Math.round(
						profileData.marketCapitalization
					)}m`}</li>
					<li>{`Shares Outstanding: ${profileData.shareOutstanding}m`}</li>
				</ul>
			</section>
		</section>
	);
};

//A chart with 4 twin bar sets, one with expected earnings one with actual earnings.

export default Profile;
