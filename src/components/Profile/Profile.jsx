///stock/profile2?symbol=AAPL
import styles from "./Profile.module.scss";
const Profile = (props) => {
	const { profileData } = props;

	const convertToRightNumber = (num) => {
		//TODO: CLEAN FUNCTION TO MAKE IT MORE STREAMLINED AND SCALEABLE
		//! still bugs check ticker "FIZZ"
		/*
		///////////////////////////////////
		* @param numArr

		* @param measurement

		* @param mInc
		///////////////////////////////////
		*/
		const numString = `${Math.round(num)}`;
		let numStart = numString;
		let measurement = ["m", "b", "t"];
		let mInc = 0;

		while (numStart.length > 3) {
			numStart = numStart.slice(0, numStart.length - 3);
			mInc++;
		}

		if (numStart.length < 3) {
			numStart = numStart + `.${numString[numStart.length - 1]}`;
		}
		console.log(numStart);
		return numStart + measurement[mInc];
	};

	//TODO: CONVERT LIST TO TABLE

	return (
		<section className={styles["company-details"]}>
			<section>
				<ul>
					<li>{`${profileData?.finnhubIndustry} - (${profileData?.country})`}</li>
					<li>
						WEBSITE: <a href={profileData?.weburl}>{profileData?.name}</a>
					</li>
					<li>{`IPO: ${profileData?.ipo}`}</li>
					<li>{`Market Cap: ${convertToRightNumber(
						profileData?.marketCapitalization
					)}
					`}</li>
					<li>{`Shares Outstandin: ${convertToRightNumber(
						profileData?.shareOutstanding
					)}`}</li>
				</ul>
			</section>
		</section>
	);
};

//A chart with 4 twin bar sets, one with expected earnings one with actual earnings.

export default Profile;
