<script lang="ts">
	import { Anchor, Button, TopNav } from '$lib';
	import { Mnemonic } from '@evolu/common';
	import { evolu } from '../../app/evolu';

	let dialogEl: HTMLDialogElement;
	let dialogTitle: string | null = null;
	let dialogContent: string | null = null;
	let hasCopiedToClipboard: boolean = false;

	function openDialog(title: string, content: string) {
		dialogTitle = title;
		dialogContent = content;
		dialogEl.showModal();
	}

	function closeDialog() {
		dialogTitle = null;
		dialogContent = null;
		hasCopiedToClipboard = false;
		dialogEl.close();
	}

	function handleShowMnemonicOnClick() {
		const owner = evolu.getAppOwner();

		openDialog('Mnemonic', owner ? owner.mnemonic : 'No mnemonic found');
	}

	function handleRestoreAppOwnerOnClick() {
		const mnemonic = window.prompt('Your Mnemonic');
		if (mnemonic == null) {
			return;
		}

		const result = Mnemonic.from(mnemonic.trim());

		if (!result.ok) {
			alert(result.error);
			return;
		}

		void evolu.restoreAppOwner(result.value);
	}

	function handleResetAppOwnerOnClick() {
		if (confirm('Are you sure? It will delete all your local data.')) {
			void evolu.resetAppOwner();
		}
	}

	function handleDownloadDatabaseOnClick() {
		void evolu.exportDatabase().then((array) => {
			const blob = new Blob([array], {
				type: 'application/x-sqlite3'
			});
			const a = document.createElement('a');
			document.body.appendChild(a);
			a.href = window.URL.createObjectURL(blob);
			a.download = 'db.sqlite3';
			a.addEventListener('click', function () {
				setTimeout(function () {
					window.URL.revokeObjectURL(a.href);
					a.remove();
				}, 1000);
			});
			a.click();
		});
	}

	function copyMnemonicToClipboard() {
		if (dialogContent == null) {
			return;
		}

		navigator.clipboard.writeText(dialogContent);
		hasCopiedToClipboard = true;
	}
</script>

<TopNav title="e~notes:settings">
	<Anchor slot="action" href="/">← home</Anchor>
</TopNav>

<hr class="my-6 border-gray-400" />

<div class="grid grid-cols-2 gap-4">
	<Button variant="secondary" on:click={handleShowMnemonicOnClick}>Show mnemonic</Button>
	<Button variant="secondary" on:click={handleRestoreAppOwnerOnClick}>Restore Owner</Button>
	<Button variant="secondary" on:click={handleResetAppOwnerOnClick}>Reset Owner</Button>
	<Button variant="secondary" on:click={handleDownloadDatabaseOnClick}>Download Database</Button>
</div>

<dialog
	bind:this={dialogEl}
	class="top-1/2 left-1/2 w-96 max-w-full -translate-x-1/2 -translate-y-1/2 rounded-lg border border-gray-300 p-6 text-center shadow-xl backdrop:bg-black/50"
>
	<h2 class="mb-4 text-xl font-semibold">{dialogTitle}</h2>
	<p class="mb-6 text-gray-600">{dialogContent}</p>

	<div class="flex items-center justify-center gap-4">
		<Button variant="primary" on:click={closeDialog}>Close</Button>
		<Button variant="secondary" on:click={copyMnemonicToClipboard} disabled={hasCopiedToClipboard}>
			{hasCopiedToClipboard ? '✓ Copied' : 'Copy'}
		</Button>
	</div>
</dialog>
