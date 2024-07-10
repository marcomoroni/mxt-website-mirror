<script lang="ts">
	import { mxtHeadTitle } from '$lib/mxtHeadTitle';
</script>

<svelte:head>
	<title>{mxtHeadTitle('Privacy policy')}</title>
	<meta property="og:title" content="Privacy policy" />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://mxt.co.uk/privacy-policy/" />
	<meta property="og:image" content="https://mxt.co.uk/preview.png" />
</svelte:head>

<div class="container">
	<h1>Privacy Statement</h1>

	<h2>Introduction</h2>
	<p>
		MXT is committed to safeguarding your privacy and believe firmly in the principles of a secure
		and open internet. This privacy statement will inform you as to how we look after your personal
		data and how you can exercise your rights over that data.
	</p>
	<p>
		Please note this statement makes no mention of cookies or similar tracking technologies because
		we deliberately do not use any. Your visit to this website isn’t being monitored and you remain
		anonymous, for as long as you choose.
	</p>

	<h2>Contacting us</h2>
	<p>
		MXT is the controller for the personal information that we do process. You may contact us via
		phone, email address or post to exercise your rights over your personal data. Those details can
		be found below:
	</p>
	<ul>
		<li>Telephone Number: 020 3633 5450</li>
		<li>Email Address: info@mxt.co.uk</li>
		<li>Postal Address: The Courtyard, 4 Evelyn Road, London, W4 5JL</li>
	</ul>
	<p>
		If your request or concern is not satisfactorily resolved by us, you have the right to make a
		complaint at any time to the Information Commissioner’s Office (ICO), the UK supervisory
		authority for data protection issues (www.ico.org.uk).
	</p>

	<h2>When we collect personal data about you</h2>
	<p>We may process your personal data via our website if:</p>
	<ul>
		<li>
			You are a purchaser, or a potential purchaser, or have requested further information about our
			products and services
		</li>
		<li>If you make an enquiry via phone or email under the “Contacts” section of our website</li>
	</ul>

	<h2>Personal data about you that we may process</h2>
	<ul>
		<li>
			Your name and your contact details (such as your contact number, email address and business or
			office address)
		</li>
		<li>
			Personal data about you that you provide to us when communicating with us via our website
		</li>
		<li>
			If you are a purchaser or potential purchaser of our products or services, we may collect
			information such as your job position, your department, your company/employer’s name or
			professional accreditation details
		</li>
	</ul>

	<h2>Technical data we obtain when you use our website</h2>
	<p>
		We want to inform you that whenever you visit our website, we receive information that your
		browser sends to us:
	</p>
	<ul>
		<li>
			The Internet protocol (IP) address used by your computer to connect to the internet and
			request access to our website.
		</li>
		<li>The date and time that we receive your request to access our website</li>
	</ul>

	<h2>How we use your personal data</h2>
	<p>We will use your personal data to:</p>
	<ul>
		<li>
			To provide you or the company you work for with the information, products and services you
			request from us
		</li>
		<li>
			Take steps in order to enter into any contract or carry out our obligations arising from any
			contract entered into between you or the company you work for and us including:
			<ul>
				<li>
					Supplying the product to you or the company you work for if you are a purchaser or a
					potential purchaser of our goods or services
				</li>
				<li>
					Verify and carry out financial transactions in reference to payments you make in your own
					capacity or on behalf of your company
				</li>
			</ul>
		</li>
	</ul>

	<h2>Who we share your personal data with</h2>
	<ul>
		<li>The relevant employees within our company, subsidiaries and affiliates</li>
		<li>Our auditors, legal advisers and other professional advisers</li>
	</ul>

	<h2>Other disclosures we may make</h2>
	<ul>
		<li>
			If MXTREALITY UK Limited or substantially all of its assets are bought, in which case personal
			data held by it about its customers will be one of the transferred assets.
		</li>
		<li>
			If we are under a duty to disclose or share your personal data in order to comply with any
			legal obligation, or in order to enforce or apply our terms of supply terms and other
			agreements with you or the company you work for.
		</li>
	</ul>

	<h2>Where we store your personal data</h2>
	<p>
		The personal data that we process in relation to you is stored where possible in the United
		Kingdom. This includes:
	</p>
	<ul>
		<li>Email storage</li>
		<li>File storage</li>
	</ul>
	<p>
		However, the personal data that we process in relation to you may be transferred to, and stored
		at, a destination outside the UK or European Economic Area (“EEA”) that may not be subject to
		equivalent data protection law.
	</p>

	<h2>How long we keep your personal data</h2>
	<p>
		We retain personal data for as long as you have an account with us in order to meet our
		contractual obligations to you and for six years after that to identify any issues and resolve
		any claims.
	</p>

	<h2>Your rights</h2>
	<p>You maintain the right:</p>
	<ul>
		<li>to be provided with a copy of your personal data held by us;</li>
		<li>to request the deletion of your personal data held by us;</li>
		<li>to request that we restrict the processing of your personal data;</li>
		<li>to object to the further processing of your personal data;</li>
		<li>to request that your provided personal data be moved to a third party;</li>
		<li>
			to request information around the existence of automated-decision making and how this may
			affect you if relevant.
		</li>
	</ul>
</div>

<style>
	.container {
		padding-top: calc(var(--nav-bar-height) + 100px);
		padding-bottom: 100px;
		padding-left: var(--case-study-margin);
		padding-right: var(--case-study-margin);
		max-width: 800px;
		margin-left: auto;
		margin-right: auto;
		font-size: 14px;
	}

	h1 {
		font-size: 20px;
		font-weight: 600;
		margin-bottom: 28px;
	}

	h2 {
		font-size: 16px;
		font-weight: 600;
		margin-top: 20px;
		margin-bottom: 8px;
	}

	ul {
		margin-top: 5px;
		margin-bottom: 5px;
		list-style-type: disc;
		margin-left: 23px;
	}
</style>
