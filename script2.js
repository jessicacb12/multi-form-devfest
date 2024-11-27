// Sample member data
const members = [
    {
        username: 'Alice',
        active: true,
    },
    {
        username: 'Bob',
        active: false,
    },
];

const memberList = document.getElementById('memberList');
const searchInput = document.getElementById('searchInput');
const addMemberButton = document.getElementById('add-member');
const editModal = document.getElementById('editModal');
const form = document.getElementById('user-edit');
const popover = document.getElementById('popover');

function initiateUI() {
    form.addEventListener('submit', event => {
        event.preventDefault();

        const formData = new FormData(form);
        const username = formData.get('username');

        if (username) {
            const active = formData.get('active');
            const foundMember = members.find(
                member => member.username === username
            );

            if (foundMember) {
                foundMember.active = active;
            } else {
                members.push({
                    username,
                    active
                });
            }

            displayMembers([]);
            displayMembers(members);
            closeModal();
            showPopover();
        }

    })

    addMemberButton.addEventListener('click', () => {
        form.elements.username.required = true;
        openModal();
    })

    const closeButton = editModal.querySelector('.close');
    if (closeButton)
        closeButton.addEventListener('click', closeModal);
}

const populateList = (ul, filteredMembers) => {
    filteredMembers.forEach(({ username, active }) => {
        const li = document.createElement('li');
        li.innerHTML = username;

        if (!active) {
            const spanChip = document.createElement('span');
            spanChip.classList.add('chip-active');
            spanChip.innerHTML = 'Inactive';
            li.appendChild(spanChip);
        }

        li.addEventListener('click', () => {
            form.elements.username.value = username;
            form.elements.username.disabled = true;
            form.elements.active.value = active;
            openModal();
        });
        ul.appendChild(li)
    });
    return ul;
}

function displayMembers(filteredMembers) {
    if(!filteredMembers.length)
        memberList.removeChild(memberList.querySelector('ul'));
    else
        memberList.appendChild(populateList(document.createElement('ul'), filteredMembers));
}

// Modal functionality
const openModal = () => {
    if ('showModal' in editModal) editModal.showModal();
    else {
        editModal.style.display = 'block';
        editModal.setAttribute('aria-modal', true);
    }
}

const closeModal = () => {
    form.elements.username.disabled = false;
    form.elements.username.required = false;

    if ('close' in editModal) editModal.close();
    else {
        editModal.style.display = 'none';
        editModal.setAttribute('aria-modal', false);
    }
};

function searchMembers() {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredMembers = members.filter(member => member.toLowerCase().includes(searchTerm));
    displayMembers(filteredMembers);
}

searchInput.addEventListener('input', searchMembers);

const showPopover = () => {
    if ('showPopover' in popover) popover.showPopover();
    else {
        popover.style.display = 'block';
    }
    setTimeout(() => {
        if ('hidePopover' in popover) popover.hidePopover();
        else {
            popover.style.display = 'none';
        }
    }, 10000);
};

// Initial display
initiateUI();
displayMembers(members);