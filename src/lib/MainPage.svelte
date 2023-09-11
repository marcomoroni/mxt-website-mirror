<script lang="ts">
	import MainPageSection from './MainPageSection.svelte';
	import MenuEntry from './MenuEntry.svelte';
	import { currentMainPageSection } from './currentMainPageSection';
	import { currentWorkVisible } from './currentWorkVisible';
	import ContactsSection from './main_page_sections/ContactsSection.svelte';
	import HomeSection from './main_page_sections/HomeSection.svelte';
	import StudioSection from './main_page_sections/StudioSection.svelte';
	import WorksSection from './main_page_sections/WorksSection.svelte';

	$: navHomeIsCurrent = $currentMainPageSection === 'Home';
	$: navWorksIsCurrent = $currentMainPageSection === 'Works';
	$: navStudioIsCurrent = $currentMainPageSection === 'Studio';
	$: navContactsIsCurrent = $currentMainPageSection === 'Contacts';

	$: workStonehengeIsCurrentClass =
		$currentWorkVisible !== null && $currentWorkVisible === 'Stonehenge' ? 'current' : '';
	$: workDrivSimIsCurrentClass =
		$currentWorkVisible !== null && $currentWorkVisible === 'DrivingSimulation' ? 'current' : '';
	$: workHelloIsCurrentClass =
		$currentWorkVisible !== null && $currentWorkVisible === 'Hello' ? 'current' : '';

	function scrollToId(id: string) {
		const el = document.getElementById(id);
		if (el !== null) {
			el.scrollIntoView({ behavior: 'smooth' });
		}
	}
</script>

<nav class="menu">
	<MenuEntry isCurrent={navWorksIsCurrent} href="/works" anchorId="nav-works">
		<svelte:fragment slot="anchorInner">Works</svelte:fragment>
		<div slot="collapsable" class="sub-sections">
			<div
				on:click={() => scrollToId('w-stonehenge')}
				class="sub-section-link {workStonehengeIsCurrentClass}"
			>
				Stonehenge
			</div>
			<div
				on:click={() => scrollToId('w-driving-sim')}
				class="sub-section-link {workDrivSimIsCurrentClass}"
			>
				Driving Simulator
			</div>
			<div
				on:click={() => scrollToId('w-hello')}
				class="sub-section-link {workHelloIsCurrentClass}"
			>
				Something else
			</div>
		</div>
	</MenuEntry>
	<MenuEntry isCurrent={navStudioIsCurrent} href="/studio" anchorId="nav-studio">
		<svelte:fragment slot="anchorInner">Studio</svelte:fragment>
	</MenuEntry>
	<MenuEntry isCurrent={navContactsIsCurrent} href="/contacts" anchorId="nav-contacts">
		<svelte:fragment slot="anchorInner">Contacts</svelte:fragment>
	</MenuEntry>
</nav>

<MenuEntry isCurrent={navHomeIsCurrent} href="/" anchorId="nav-home" useLogo={true}>
	<svelte:fragment slot="anchorInner">Home</svelte:fragment>
</MenuEntry>

<MainPageSection id="section-home" associatedUrl="/">
	<HomeSection />
</MainPageSection>
<MainPageSection id="section-works" associatedUrl="/works">
	<WorksSection />
</MainPageSection>
<MainPageSection id="section-studio" associatedUrl="/studio">
	<StudioSection />
</MainPageSection>
<MainPageSection id="section-contacts" associatedUrl="/contacts">
	<ContactsSection />
</MainPageSection>

<style>
	.menu {
		position: fixed;
		left: 35px;
		top: 33px;
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	:global(.menu-entry .mxt-logo) {
		position: fixed;
		right: 35px;
		top: 47px;
		width: 100px;
		transition: opacity 0.4s var(--curve) 0.5s, top 0.4s var(--curve) 0.5s;
	}

	:global(.menu-entry.current .mxt-logo) {
		top: 43px;
		opacity: 0;
		pointer-events: none;
		transition-delay: 0s;
	}

	.sub-section-link {
		cursor: pointer;
	}
</style>
