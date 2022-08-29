///stock/profile2?symbol=AAPL
import styles from "./Profile.module.scss";
const Profile = (props) => {
	const { profileData } = props;

	const convertToRightNumber = (num) => {
		/*
		///////////////////////////////////
		* @param measurement: array of the number measurments

		* @param mInc: The incriment var used to determien which measurement is appended to the end of the number
		///////////////////////////////////
		*/
		const numString = `${Math.round(num)}`;
		let numStart = numString;
		let measurement = ["m", "b", "t"];
		let mInc = 0;

		//Conversion 1 ) numStart's length is reduced until it is 3 digits
		while (numStart.length > 3) {
			numStart = numStart.slice(0, numStart.length - 3);
			mInc++;
		}

		// Conversion 2 ) The correct measurement is appended to the string depending on number of slices initiated in the loop above
		if (numStart.length < 3) {
			numStart = numStart + `.${numString[numStart.length - 1]}`;
		}
		return numStart + measurement[mInc];
	};

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
