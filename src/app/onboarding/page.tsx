import { protectedPage } from "@/utils/protected-page";
import OnboardingPage from "@/components/pages/Onboarding";

export default async function Onboarding() {
	const user = await protectedPage();
	const userData = {
		user_id: user.id!,
		user_email: user.email!,
		user_name: user.user_metadata.full_name!,
		user_avatar: user.user_metadata.avatar_url!,
	}
	return <OnboardingPage user={userData} />;
}