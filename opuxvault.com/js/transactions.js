// Function to fetch transaction history from localStorage
async function fetchTransactionHistory(type) {
    const user = JSON.parse(localStorage.getItem("user")) || { transactions: [], withdrawals: [] };

    if (type === 'deposits') {
        return Array.isArray(user.transactions) ? user.transactions : [];
    } else if (type === 'withdrawals') {
        return Array.isArray(user.withdrawals) ? user.withdrawals : [];
    }
    return [];
}

async function displayTransactionHistory(type) {
    const tableBodyId = type === 'withdrawals' ? 'withdrawalsTableBody' : 'depositsTableBody';
    const transactions = await fetchTransactionHistory(type);
    const tableBody = document.getElementById(tableBodyId);
    tableBody.innerHTML = '';

    console.log(`${type} transactions:`, transactions);  // Ensure the correct transactions are being fetched

    // Check if transactions exist
    if (!transactions.length) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td colspan="4" class="text-center">No ${type} transactions found</td>
        `;
        tableBody.appendChild(row);
        return;
    }

    // Display transactions
    transactions.forEach(tx => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${new Date(tx.timestamp).toLocaleString()}</td>
            <td>${tx.amount} ETH</td>
            <td>${tx.status}</td>
            <td>${"0x4bbcd1cd24cd0dcba589cd9349dd595744686a6d"}</td>
        `;
        tableBody.appendChild(row);
    });
}

// Function to switch between withdrawal and deposit tabs
function switchTransactionTab(type) {
    const withdrawalTab = document.getElementById('withdrawalTab');
    const depositTab = document.getElementById('depositTab');
    const withdrawalContent = document.getElementById('withdrawalContent');
    const depositContent = document.getElementById('depositContent');

    if (type === 'withdrawals') {
        withdrawalTab.classList.add('active');
        depositTab.classList.remove('active');
        withdrawalContent.classList.add('show', 'active');
        depositContent.classList.remove('show', 'active');
        displayTransactionHistory('withdrawals');
    } else {
        depositTab.classList.add('active');
        withdrawalTab.classList.remove('active');
        depositContent.classList.add('show', 'active');
        withdrawalContent.classList.remove('show', 'active');
        displayTransactionHistory('deposits');
    }
}

// Function to show transaction history modal
function showTransactionHistoryModal() {
    const modalElement = document.getElementById('transactionHistoryModal');
    const transactionHistoryModal = new bootstrap.Modal(modalElement);
    transactionHistoryModal.show();
    displayTransactionHistory('withdrawals'); // Show withdrawals by default
}

// Event listeners for tab switching
document.getElementById('withdrawalTab').addEventListener('click', () => switchTransactionTab('withdrawals'));
document.getElementById('depositTab').addEventListener('click', () => switchTransactionTab('deposits'));

// Automatically load withdrawals when the modal is shown
document.getElementById('transactionHistoryModal').addEventListener('shown.bs.modal', () => {
    displayTransactionHistory('withdrawals');
});