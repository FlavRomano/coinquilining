<script lang="ts">
	import InputPassword from "$components/InputPassword.svelte";
	import { superForm } from "sveltekit-superforms/client";
	import { changePasswordSchema } from "$types/lib/schemas";

	export let data;

	const { form, constraints, message, enhance } = superForm(
		data.changePasswordForm,
		{
			taintedMessage: null,
			validators: changePasswordSchema,
		}
	);
</script>

<div class="flex flex-col items-center pt-14">
	<form action="?/changePassword" method="post">
		<div class="form-control gap-4">
			<div class="w-fit">
				<InputPassword
					text={"Old Password"}
					name={"oldPassword"}
					{form}
					{constraints}
				/>

				<InputPassword
					text={"New Password"}
					name={"newPassword"}
					{form}
					{constraints}
				/>
				<button class="btn btn-primary w-full max-w-full my-4"
					>CHANGE</button
				>
			</div>
		</div>
	</form>
</div>
