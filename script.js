const formInfo = [
    {
        title: 'Personal Information',
        form: [
            { label: 'First Name', name: 'first_name', type: 'text' },
            { label: 'Last Name', name: 'last_name', type: 'text' },
        ]
    },
    {
        title: 'Purpose of Visit',
        form: [
            { label: 'Family in here?',name: 'family_in_here', type: 'radio', option: ['Yes', 'No'] },
        ]
    },
    {
        title: 'Travel Itinerary',
        form: [
            { label: 'Address', name: 'address', type: 'text' },
        ]
    },
    {
        title: 'Accommodation Details',
        form: [
            { label: 'Flight Name', name: 'flight_name', type: 'text' },
            { label: 'Flight Number', name: 'flight_number', type: 'text' },
        ]
    },
    {
        title: 'Financial Information',
        form: [
            { label: 'Bank Account', name: 'bank_account', type: 'number' },
        ]
    },
    {
        title: 'Document Upload',
        form: [
            { label: 'Passport', name: 'passport', type: 'file' },
        ]
    },
    {
        title: 'Review and Submit',
    },
]
let data = {}

function createLabelFor(name, label = '') {
    const labelElement = document.createElement('label');
    labelElement.innerHTML = label || name;
    labelElement.setAttribute('for', name);
    return labelElement;
}

function createFormItem(form) {
    return (field) => {
        const { label, name, type } = field;
        const formElement = document.createElement('p');
        formElement.appendChild(createLabelFor(name, label));

        switch(type) {
            case 'radio':
                field.option.forEach(
                    option => {
                        const optionElement = document.createElement('input');
                        optionElement.setAttribute('type', type);
                        optionElement.setAttribute('name', name);
                        optionElement.setAttribute('id', option);
                        optionElement.setAttribute('value', option);
                        if (data[name] === option) optionElement.setAttribute('checked', 'checked');
                        formElement.appendChild(optionElement);
                        formElement.appendChild(createLabelFor(option));
                    }
                )
                break;

            default:
                const fieldElement = document.createElement('input');
                fieldElement.setAttribute('type', type);
                fieldElement.setAttribute('name', name);
                if (data[name] !== undefined) fieldElement.setAttribute('value', data[name]);
                formElement.appendChild(fieldElement)
                break;
        }
        form.appendChild(formElement);
    }
}

function populateForm(index) {
    const container = document.querySelector('section');
    if (container.childNodes.length) container.removeChild(container.querySelector('form'));

    if (container) {
        const form = document.createElement('form');
        formInfo[index].form.forEach(createFormItem(form));
        const button = document.createElement('input');
        button.setAttribute('type', 'submit');
        button.setAttribute('value', 'Next');

        form.appendChild(button);
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            const formData = new FormData(event.target);
            formData.forEach((value, key) => {
                data[key] = value;
            });
            populateTabContent(index + 1)
        })

        container.appendChild(form);
    }
}

function populateTabContent(index, tabElement) {
    const listParent = document.querySelector('ul');

    let currentTabElement = tabElement;
    if (!currentTabElement) currentTabElement = listParent.childNodes[index + 1];

    const [prevActiveTab] = (listParent.getElementsByClassName('active') || []);
    prevActiveTab?.classList?.remove('active');
    currentTabElement?.classList?.add('visited');
    currentTabElement?.classList?.add('active');

    if (index !== formInfo.length - 1) populateForm(index);
}

function onClickTab(index) {
    return (event) => {
        const tab = event?.target;
        populateTabContent(index, tab)
    }
}

function initiateTab() {
    const listParent = document.querySelector('ul');
    if (listParent) {
        formInfo.forEach(
            ({ title }, index) => {
                const listChild = document.createElement('li');
                if (index === 0) {
                    listChild.classList.add('visited');
                    listChild.classList.add('active');
                    populateForm(index);
                }

                listChild.innerHTML = title;
                listChild.addEventListener('click', onClickTab(index));
                listParent.appendChild(listChild);
            }
        )
    }
}

initiateTab(0);