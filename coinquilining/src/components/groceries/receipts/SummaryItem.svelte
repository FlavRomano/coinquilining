<script lang="ts">
	export let roommate, outgoings, payments;

	let balance = Number(roommate.balance).toLocaleString("it-IT", {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
		style: "currency",
		currency: "EUR",
	});
</script>

<div class="collapse bg-base-200">
	<input type="checkbox" />
	<div class="collapse-title text-xl font-medium">
		{roommate.firstname + " " + roommate.lastname}
		<div class="absolute right-4 top-4">{balance}</div>
	</div>
	<div class="collapse-content">
		<ul>
			<li>
				<a class="link link-primary" href="#">Outgoings</a>: {outgoings.filter(
					(outgoing) =>
						outgoing.from.name === roommate.name &&
						outgoing.from.surname === roommate.surname
				).length}
			</li>
			<li>
				<a class="link link-primary" href="#">Payments</a>: {payments.filter(
					(payment) =>
						payment.from.name === roommate.name &&
						payment.from.surname === roommate.surname
				).length}
			</li>
		</ul>
	</div>
</div>
