//создание header
const createHeader = () => {
  const header = document.createElement('header');
  const container = document.createElement('div');
  const logo = document.createElement('a');
  const logoImg = document.createElement('img');
  const form = document.createElement('form');
  const input = document.createElement('input');
  const wrapper = document.createElement('div');
  const inner = document.createElement('div');
  const findList = document.createElement('ul');

  header.classList.add('header');
  container.classList.add('container', 'header__container');
  logo.classList.add('logo', 'header__logo');
  logoImg.classList.add('logo__img');
  logoImg.src = '/frontend/img/header-logo.svg'
  logoImg.alt = 'Логотип';
  form.classList.add('header__form');
  input.classList.add('header__input');
  wrapper.classList.add('header__wrapper');
  inner.classList.add('header__inner');
  findList.classList.add('hide', 'find-list');
  input.placeholder = 'Введите запрос';

  inner.append(input, findList);
  logo.append(logoImg);
  form.append(inner);
  container.append(logo, form);
  header.append(container);

  return header;
}

//получаем данные с сервера
const getClientsData = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/clients', {
      method: 'GET'
    });

    let result = await response.json();

    const clients = result;
    return clients;
  } catch (error) {
    console.log(error);
  }
}

//создание и изменение клиента
const sendClientData = async (client, method, id = null) => {
  try {
    const response = await fetch(`http://localhost:3000/api/clients/${method === 'POST' ? '' : id}`, {
      method,
      body: JSON.stringify(client)
    });

    const result = await response.json();

    return result;
  } catch (error) {
    console.log(error);
  }
}

//удаление клиента
const deleteClientItem = async (id) => {
  try {
    await fetch(`http://localhost:3000/api/clients/${id}`, {
      method: 'DELETE',
    });
  } catch (error) {
    console.log(error);
  }
} 

//поиск клиента на сервере
const findClient = async (value) => {
  try {
    const response = await fetch(`http://localhost:3000/api/clients?search=${value}`, {
      method: 'GET'
    });

    const result = await response.json();
    
    return result;
  } catch (error) {
    console.log(error);
  }
}

//прелоадер
const createPreloader = () => {
  const preloaderBlock = document.createElement('div');
  const preloaderCircle = document.createElement('span');

  preloaderBlock.classList.add('preloader');
  preloaderCircle.classList.add('loader-1');
  preloaderCircle.id = 'loader';
  preloaderBlock.append(preloaderCircle);

  return preloaderBlock;
};

//создание шапки таблицы
const createTableThead = () => {
  const section = document.createElement('section');
  const container = document.createElement('container');
  const h1 = document.createElement('h1');
  const tableContainer = document.createElement('div');
  const table = document.createElement('table');
  const tableThead = document.createElement('thead');
  const theadTr = document.createElement('tr');
  const theadID = document.createElement('th');
  const theadFio = document.createElement('th');
  const theadFioSpan = document.createElement('span');
  const theadCreateTime = document.createElement('th');
  const theadChangeTime = document.createElement('th');
  const theadContacts = document.createElement('th');
  const theadActions = document.createElement('th');
  const tbody = document.createElement('tbody');
  const addClientBtn = document.createElement('button');
  const addClientSvg = document.createElement('span');
  const addClientText = document.createElement('span');

  table.id = 'table';

  section.classList.add('clients');
  container.classList.add('container', 'clients__container');
  h1.classList.add('clients__title');
  tableContainer.classList.add('clients__table-container')
  table.classList.add('clients__table');
  tableThead.classList.add('table-head');
  theadID.classList.add('table-head__col', 'id-col', 'sort-up');
  theadFio.classList.add('table-head__col', 'FIO-col', 'sort-down');
  theadCreateTime.classList.add('table-head__col', 'create-col', 'sort-down');
  theadChangeTime.classList.add('table-head__col', 'update-col', 'sort-down');
  theadContacts.classList.add('table-head__col');
  theadActions.classList.add('table-head__col');
  tbody.classList.add('table-body');
  addClientBtn.classList.add('clients__btn');
  addClientSvg.classList.add('clients__btn-svg');

  h1.textContent = 'Клиенты';
  theadID.textContent = 'ID';
  theadFio.textContent = 'Фамилия Имя Отчество';
  theadFioSpan.textContent = 'А-Я';
  theadCreateTime.textContent = 'Дата и время создания';
  theadChangeTime.textContent = 'Последние изменения';
  theadContacts.textContent = 'Контакты';
  theadActions.textContent = 'Действия';
  addClientText.textContent = 'Добавить клиента';
  addClientBtn.id = 'addClient';
  
  theadID.setAttribute('data-type', 'id');
  theadFio.setAttribute('data-type', 'text');
  theadCreateTime.setAttribute('data-type', 'create');
  theadChangeTime.setAttribute('data-type', 'update');

  addClientBtn.addEventListener('click', () => {
    document.body.append(addClientModal());
  });

  theadFio.append(theadFioSpan);
  theadTr.append(
    theadID,
    theadFio,
    theadCreateTime,
    theadChangeTime,
    theadContacts,
    theadActions
  );
  tableThead.append(theadTr);
  tbody.append(createPreloader());
  tableContainer.append(table);
  table.append(tableThead, tbody);
  addClientBtn.append(addClientSvg, addClientText);
  container.append(
    h1,
    tableContainer,
    addClientBtn
  );
  section.append(container);

  return {
    section,
    table,
    tbody
  }
};

//построение таблицы
const buildTableRow = (data) => {
  let ID = data.id.substr(0,6);
  let FIO = data.surname + " " + data.name + " " + data.lastName;
  let createDate = date(data.createdAt);
  let createTime = time(data.createdAt);
  let changeDate = date(data.updatedAt);
  let changeTime = time(data.updatedAt);

  const tableTr = document.createElement('tr');
  const clientID = document.createElement('td');
  const clientFullName = document.createElement('td');
  const clientCreated = document.createElement('td');
  const clientChanged = document.createElement('td');
  const clientContacts = document.createElement('td');
  const clientActions = document.createElement('td');
  const clientCreateDate = document.createElement('span');
  const clientCreateTime = document.createElement('span');
  const clientChangeDate = document.createElement('span');
  const clientChangeTime = document.createElement('span');
  const editClientBtn = document.createElement('button');
  const deleteClientBtn = document.createElement('button');
  const editSpinner = document.createElement('span');
  const deleteSpinner = document.createElement('span');

  tableTr.id = data.id;

  clientCreateTime.classList.add('time');
  clientChangeTime.classList.add('time');
  clientActions.classList.add('btns');
  editClientBtn.classList.add('btn', 'btn-change');
  deleteClientBtn.classList.add('btn', 'btn-delete');
  editSpinner.classList.add('actions__spinner');
  deleteSpinner.classList.add('actions__spinner');
  editClientBtn.textContent = 'Изменить';
  deleteClientBtn.textContent = 'Удалить';

  clientID.textContent = ID;
  clientFullName.textContent = FIO;
  clientCreateDate.textContent = createDate;
  clientCreateTime.textContent = createTime;
  clientChangeDate.textContent = changeDate;
  clientChangeTime.textContent = changeTime;
  editSpinner.innerHTML = `
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3.00008 8.04008C3.00008 10.8236 5.2566 13.0801 8.04008 13.0801C10.8236 13.0801 13.0801 10.8236 13.0801 8.04008C13.0801 5.2566 10.8236 3.00008 8.04008 3.00008C7.38922 3.00008 6.7672 3.12342 6.196 3.34812" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round"/>
    </svg>`;
  deleteSpinner.innerHTML = `
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3.00008 8.04008C3.00008 10.8236 5.2566 13.0801 8.04008 13.0801C10.8236 13.0801 13.0801 10.8236 13.0801 8.04008C13.0801 5.2566 10.8236 3.00008 8.04008 3.00008C7.38922 3.00008 6.7672 3.12342 6.196 3.34812" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round"/>
    </svg>`;
  clientContacts.innerHTML = getContacts(data.contacts);

  editClientBtn.addEventListener('click', () => {
    editSpinner.style.display = 'block';
    editClientBtn.classList.add('action-wait');

    setTimeout(() => {
      document.body.append(editClientModal(data).editModal);

      editSpinner.style.display = 'none';
      editClientBtn.classList.remove('action-wait');
    }, 1000);
  });

  deleteClientBtn.addEventListener('click', (e) => {
    deleteSpinner.style.display = 'block';
    deleteClientBtn.classList.add('action-wait');

    setTimeout(() => {
      const deleteModal = deleteClientModal();
      document.body.append(deleteModal.deleteModal);

      deleteModal.deleteModalDelete.addEventListener('click', () => {
        deleteClientItem(data.id);
        document.getElementById(data.id).remove();
        deleteModal.deleteModal.remove();
      });

      deleteSpinner.style.display = 'none';
      deleteClientBtn.classList.remove('action-wait');
    }, 1000);
  });

  editClientBtn.prepend(editSpinner);
  deleteClientBtn.prepend(deleteSpinner);
  clientActions.append(editClientBtn, deleteClientBtn);
  clientCreated.append(clientCreateDate, clientCreateTime);
  clientChanged.append(clientChangeDate, clientChangeTime);
  tableTr.append(
    clientID,
    clientFullName,
    clientCreated,
    clientChanged,
    clientContacts,
    clientActions
  );

  return tableTr;
}

//форматируем дату 
function date(str) {
  let date = str.slice(0,10);
  let newDate = date.replace(/(\d*)-(\d*)-(\d*)/, '$3.$2.$1');
  return newDate;
}

//форматируем время
function time(str) {
  let time = str.slice(11,16);
  return time;
}

//получаем контакты
const getContacts = (data) => {
  let listOfContacs = document.createElement('div');
  listOfContacs.classList.add('contacts-list');
  for (i = 0; i < data.length; i++) {
    if (data[i].type == 'Телефон') {
      let phoneItem = document.createElement('a');
      phoneItem.classList.add('contacts-item');
      let phone = data[i].value.slice(1, 12);
      let number = phone.replace(/^(\d{3})(\d{3})(\d{2})(\d{2})/, '+7 ($1) $2-$3-$4');
      phoneItem.setAttribute("data-tooltip", `Телефон: ${number}`);
      let phoneSvg = `
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="8" cy="8" r="8" fill="#9873FF"/>
          <path d="M11.56 9.50222C11.0133 9.50222 10.4844 9.41333 9.99111 9.25333C9.83556 9.2 9.66222 9.24 9.54222 9.36L8.84444 10.2356C7.58667 9.63556 6.40889 8.50222 5.78222 7.2L6.64889 6.46222C6.76889 6.33778 6.80444 6.16444 6.75556 6.00889C6.59111 5.51556 6.50667 4.98667 6.50667 4.44C6.50667 4.2 6.30667 4 6.06667 4H4.52889C4.28889 4 4 4.10667 4 4.44C4 8.56889 7.43556 12 11.56 12C11.8756 12 12 11.72 12 11.4756V9.94222C12 9.70222 11.8 9.50222 11.56 9.50222Z" fill="white"/>
        </svg>
      `;
      phoneItem.href = `tel:${number}`;
      phoneItem.innerHTML = phoneSvg;
      listOfContacs.appendChild(phoneItem);
    }
    if (data[i].type == 'Vk') {
      let vkItem = document.createElement('a');
      vkItem.classList.add('contacts-item');
      vkItem.setAttribute("data-tooltip", `Vkontakte: ${data[i].value}`);
      let vkSvg = `
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 0C3.58187 0 0 3.58171 0 8C0 12.4183 3.58187 16 8 16C12.4181 16 16 12.4183 16 8C16 3.58171 12.4181 0 8 0ZM12.058 8.86523C12.4309 9.22942 12.8254 9.57217 13.1601 9.97402C13.3084 10.1518 13.4482 10.3356 13.5546 10.5423C13.7065 10.8371 13.5693 11.1604 13.3055 11.1779L11.6665 11.1776C11.2432 11.2126 10.9064 11.0419 10.6224 10.7525C10.3957 10.5219 10.1853 10.2755 9.96698 10.037C9.87777 9.93915 9.78382 9.847 9.67186 9.77449C9.44843 9.62914 9.2543 9.67366 9.1263 9.90707C8.99585 10.1446 8.96606 10.4078 8.95362 10.6721C8.93577 11.0586 8.81923 11.1596 8.43147 11.1777C7.60291 11.2165 6.81674 11.0908 6.08606 10.6731C5.44147 10.3047 4.94257 9.78463 4.50783 9.19587C3.66126 8.04812 3.01291 6.78842 2.43036 5.49254C2.29925 5.2007 2.39517 5.04454 2.71714 5.03849C3.25205 5.02817 3.78697 5.02948 4.32188 5.03799C4.53958 5.04143 4.68362 5.166 4.76726 5.37142C5.05633 6.08262 5.4107 6.75928 5.85477 7.38684C5.97312 7.55396 6.09391 7.72059 6.26594 7.83861C6.45582 7.9689 6.60051 7.92585 6.69005 7.71388C6.74734 7.57917 6.77205 7.43513 6.78449 7.29076C6.82705 6.79628 6.83212 6.30195 6.75847 5.80943C6.71263 5.50122 6.53929 5.30218 6.23206 5.24391C6.07558 5.21428 6.0985 5.15634 6.17461 5.06697C6.3067 4.91245 6.43045 4.81686 6.67777 4.81686L8.52951 4.81653C8.82136 4.87382 8.88683 5.00477 8.92644 5.29874L8.92808 7.35656C8.92464 7.47032 8.98521 7.80751 9.18948 7.88198C9.35317 7.936 9.4612 7.80473 9.55908 7.70111C10.0032 7.22987 10.3195 6.67368 10.6029 6.09801C10.7279 5.84413 10.8358 5.58142 10.9406 5.31822C11.0185 5.1236 11.1396 5.02785 11.3593 5.03112L13.1424 5.03325C13.195 5.03325 13.2483 5.03374 13.3004 5.04274C13.6009 5.09414 13.6832 5.22345 13.5903 5.5166C13.4439 5.97721 13.1596 6.36088 12.8817 6.74553C12.5838 7.15736 12.2661 7.55478 11.9711 7.96841C11.7001 8.34652 11.7215 8.53688 12.058 8.86523Z" fill="#9873FF"/>
        </svg>
      `;
      vkItem.href = data[i].value.trim();
      vkItem.innerHTML = vkSvg;
      listOfContacs.appendChild(vkItem);
    }
    if (data[i].type == 'Email') {
      let mailItem = document.createElement('a');
      mailItem.classList.add('contacts-item');
      mailItem.setAttribute("data-tooltip", `Email: ${data[i].value}`);
      let mailSvg = `
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM4 5.75C4 5.3375 4.36 5 4.8 5H11.2C11.64 5 12 5.3375 12 5.75V10.25C12 10.6625 11.64 11 11.2 11H4.8C4.36 11 4 10.6625 4 10.25V5.75ZM8.424 8.1275L11.04 6.59375C11.14 6.53375 11.2 6.4325 11.2 6.32375C11.2 6.0725 10.908 5.9225 10.68 6.05375L8 7.625L5.32 6.05375C5.092 5.9225 4.8 6.0725 4.8 6.32375C4.8 6.4325 4.86 6.53375 4.96 6.59375L7.576 8.1275C7.836 8.28125 8.164 8.28125 8.424 8.1275Z" fill="#9873FF"/>
        </svg>
      `;
      mailItem.href = `mailto:${data[i].value.trim()}`;
      mailItem.innerHTML = mailSvg;
      listOfContacs.appendChild(mailItem);
    }
    if (data[i].type == 'Facebook') {
      let fbItem = document.createElement('a');
      fbItem.classList.add('contacts-item');
      fbItem.setAttribute("data-tooltip", `Facebook: ${data[i].value}`);
      let fbSvg = `
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7.99999 0C3.6 0 0 3.60643 0 8.04819C0 12.0643 2.928 15.3976 6.75199 16V10.3775H4.71999V8.04819H6.75199V6.27309C6.75199 4.25703 7.94399 3.14859 9.77599 3.14859C10.648 3.14859 11.56 3.30121 11.56 3.30121V5.28514H10.552C9.55999 5.28514 9.24799 5.90362 9.24799 6.53815V8.04819H11.472L11.112 10.3775H9.24799V16C11.1331 15.7011 12.8497 14.7354 14.0879 13.2772C15.3261 11.819 16.0043 9.96437 16 8.04819C16 3.60643 12.4 0 7.99999 0Z" fill="#9873FF"/>
        </svg>
      `;
      fbItem.href = data[i].value.trim();
      fbItem.innerHTML = fbSvg;
      listOfContacs.appendChild(fbItem);
    } 
    if (data[i].type == 'Другое') {
      let contactItem = document.createElement('a');
      contactItem.classList.add('contacts-item');
      contactItem.setAttribute("data-tooltip", `Contact: ${data[i].value}`);
      let contactSvg = `
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM3 8C3 5.24 5.24 3 8 3C10.76 3 13 5.24 13 8C13 10.76 10.76 13 8 13C5.24 13 3 10.76 3 8ZM9.5 6C9.5 5.17 8.83 4.5 8 4.5C7.17 4.5 6.5 5.17 6.5 6C6.5 6.83 7.17 7.5 8 7.5C8.83 7.5 9.5 6.83 9.5 6ZM5 9.99C5.645 10.96 6.75 11.6 8 11.6C9.25 11.6 10.355 10.96 11 9.99C10.985 8.995 8.995 8.45 8 8.45C7 8.45 5.015 8.995 5 9.99Z" fill="#9873FF"/>
        </svg>
      `;
      contactItem.href = data[i].value.trim();
      contactItem.innerHTML = contactSvg;
      listOfContacs.appendChild(contactItem);
    }
  }
  if (data.length > 4) {
    let contacts = Array.from(listOfContacs.childNodes);
    contacts.slice(4).forEach(e => e.style.display = 'none');

    let showMore = document.createElement('button');
    let showMoreItem = document.createElement('a');
    showMore.classList.add('contacts-btn');
    showMore.innerHTML = `+${data.length-4}`;

    showMoreItem.append(showMore)
    listOfContacs.appendChild(showMoreItem);

    showMore.addEventListener('click', async (e) => {
      contacts.slice(4).forEach(e => e.style.display = 'block');
      showMore.style.display = 'none';
      console.log(2)
    });
  }

  return listOfContacs.outerHTML;
}

// создаем модального окна
const createModal = () => {
  const modalBlockTitle = document.createElement('div');
  const modalTitle = document.createElement('h2');
  const modalClose = document.createElement('button');
  const form = document.createElement('form');
  const surnameBlock = document.createElement('div');
  const inputSurname = document.createElement('input');
  const labelSurname = document.createElement('label');
  const labelSurnameSpan = document.createElement('span');
  const nameBlock = document.createElement('div');
  const inputName = document.createElement('input');
  const labelName = document.createElement('label');
  const labelNameSpan = document.createElement('span');
  const lastNameBlock = document.createElement('div');
  const inputLastName = document.createElement('input');
  const labelLastName = document.createElement('label');
  const contactsBlock = document.createElement('div');
  const addContactBtn = document.createElement('button');
  const saveButton = document.createElement('button');
  const saveButtonSpan = document.createElement('span');
  const modalCancel = document.createElement('button');
  const contactsDiv = document.createElement('div');

  modalBlockTitle.classList.add('modal__title');
  modalTitle.classList.add('modal__heading');
  modalClose.classList.add('modal__close-btn');
  form.classList.add('form');
  nameBlock.classList.add('form__div');
  surnameBlock.classList.add('form__div');
  lastNameBlock.classList.add('form__div');
  inputSurname.classList.add('modal__input', 'modal__text')
  labelSurnameSpan.classList.add('required');
  inputName.classList.add('modal__input', 'modal__text')
  labelNameSpan.classList.add('required');
  inputLastName.classList.add('modal__input', 'modal__text')
  contactsBlock.classList.add('modal__contacts');
  addContactBtn.classList.add('modal__contacts-add-btn', 'modal__contacts-add-btn-active', 'modal__text');
  saveButton.classList.add('modal__save-btn', 'modal__text');
  modalCancel.classList.add('modal__cancel-btn');
  contactsDiv.classList.add('contacts__div');

  labelSurname.for = 'modalSurname';
  inputSurname.type = 'text';
  labelName.for = 'modalName';
  inputName.type = 'text';
  labelLastName.for = 'modalLastName';
  inputLastName.type = 'text';
  contactsDiv.id = 'contactsDiv';
  inputName.id = 'modalName';
  inputSurname.id = 'modalSurname';
  inputLastName.id = 'modalLastName';
  inputName.placeholder = 'Имя';
  inputSurname.placeholder = 'Фамилия';
  inputLastName.placeholder = 'Отчество';

  labelSurname.textContent = 'Фамилия'
  labelName.textContent = 'Имя'
  labelLastName.textContent = 'Отчество';
  saveButtonSpan.textContent = 'Сохранить';
  modalCancel.textContent = 'Отменить';
  modalTitle.textContent = 'Новый клиент';
  labelSurnameSpan.textContent = '*';
  labelNameSpan.textContent = '*';

  modalBlockTitle.append(modalTitle, modalClose);
  labelSurname.append(labelSurnameSpan);
  surnameBlock.append(inputSurname, labelSurname);
  labelName.append(labelNameSpan);
  nameBlock.append(inputName, labelName);
  lastNameBlock.append(inputLastName, labelLastName);
  contactsBlock.append(addContactBtn);
  contactsBlock.prepend(contactsDiv);
  saveButton.append(saveButtonSpan);
  form.append(surnameBlock, nameBlock, lastNameBlock, contactsBlock, saveButton, modalCancel);

  //создание спиннера
  const saveSpinner = document.createElement('span');
  saveSpinner.classList.add('modal__spinner');
  saveSpinner.innerHTML = `
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M3.00008 8.04008C3.00008 10.8236 5.2566 13.0801 8.04008 13.0801C10.8236 13.0801 13.0801 10.8236 13.0801 8.04008C13.0801 5.2566 10.8236 3.00008 8.04008 3.00008C7.38922 3.00008 6.7672 3.12342 6.196 3.34812" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round"/>
  </svg>`

  //создаем блок с ошибкой для валидации
  const errorBlock = document.createElement('p');
  const wrongLetter = document.createElement('span');
  const writeName = document.createElement('span');
  const writeSurname = document.createElement('span');
  const writeLastName = document.createElement('span');
  const requiredValue = document.createElement('span');
  const requiredContacts = document.createElement('span');

  errorBlock.classList.add('modal__error');
  wrongLetter.id = 'wrongLetter';
  writeName.id = 'writeName';
  writeSurname.id = 'writeSurname';
  writeLastName.id = 'writeLastName';
  requiredValue.id = 'requiredValue';
  requiredContacts.id = 'requiredContacts';

  errorBlock.append(
    writeName,
    writeSurname,
    writeLastName,
    requiredValue,
    requiredContacts,
    wrongLetter
  );

  contactsBlock.after(errorBlock);
  saveButton.prepend(saveSpinner);

  addContactBtn.innerHTML = `
  <svg width="14" height="14" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg"><path d="M6.99998 3.66683C6.63331 3.66683 6.33331 3.96683 6.33331 4.3335V6.3335H4.33331C3.96665 6.3335 3.66665 6.6335 3.66665 7.00016C3.66665 7.36683 3.96665 7.66683 4.33331 7.66683H6.33331V9.66683C6.33331 10.0335 6.63331 10.3335 6.99998 10.3335C7.36665 10.3335 7.66665 10.0335 7.66665 9.66683V7.66683H9.66665C10.0333 7.66683 10.3333 7.36683 10.3333 7.00016C10.3333 6.6335 10.0333 6.3335 9.66665 6.3335H7.66665V4.3335C7.66665 3.96683 7.36665 3.66683 6.99998 3.66683ZM6.99998 0.333496C3.31998 0.333496 0.333313 3.32016 0.333313 7.00016C0.333313 10.6802 3.31998 13.6668 6.99998 13.6668C10.68 13.6668 13.6666 10.6802 13.6666 7.00016C13.6666 3.32016 10.68 0.333496 6.99998 0.333496ZM6.99998 12.3335C4.05998 12.3335 1.66665 9.94016 1.66665 7.00016C1.66665 4.06016 4.05998 1.66683 6.99998 1.66683C9.93998 1.66683 12.3333 4.06016 12.3333 7.00016C12.3333 9.94016 9.93998 12.3335 6.99998 12.3335Z"/></svg>
  <svg width="14" height="14" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M0.333313 7.00016C0.333313 3.32016 3.31998 0.333496 6.99998 0.333496C10.68 0.333496 13.6666 3.32016 13.6666 7.00016C13.6666 10.6802 10.68 13.6668 6.99998 13.6668C3.31998 13.6668 0.333313 10.6802 0.333313 7.00016ZM6.33329 4.33366C6.33329 3.96699 6.63329 3.66699 6.99996 3.66699C7.36663 3.66699 7.66663 3.96699 7.66663 4.33366V6.33366H9.66663C10.0333 6.33366 10.3333 6.63366 10.3333 7.00033C10.3333 7.36699 10.0333 7.66699 9.66663 7.66699H7.66663V9.66699C7.66663 10.0337 7.36663 10.3337 6.99996 10.3337C6.63329 10.3337 6.33329 10.0337 6.33329 9.66699V7.66699H4.33329C3.96663 7.66699 3.66663 7.36699 3.66663 7.00033C3.66663 6.63366 3.96663 6.33366 4.33329 6.33366H6.33329V4.33366Z"/></svg>
  <span>Добавить контакт</span>`;

  addContactBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const contactsItems = document.getElementsByClassName('contact');

    if (contactsItems.length < 9) {
      const contactItem = createContactItem();
      contactsDiv.append(contactItem.contact);
      if (contactItem.length >= 5) {
        document.querySelector('.modal__content').style.top = '70%';
      } else {
        document.querySelector('.modal__content').style.top = '50%';
      }
    } else {
      const contactItem = createContactItem();
      contactsDiv.append(contactItem.contact);
      addContactBtn.classList.remove('modal__contacts-add-btn-active');
    }
  });

  return {
    form,
    modalClose,
    modalBlockTitle, 
    modalTitle,
    modalCancel,
    inputName,
    inputSurname,
    inputLastName,
    labelName,
    labelSurname,
    labelLastName,
    contactsBlock,
    contactsDiv,
    addContactBtn,
  }
}

//добавление клиента 
const addClientModal = () => {
  const createForm = createModal();
  const modal = document.createElement('div');
  const modalContent = document.createElement('div');

  modal.classList.add('modal', 'modal-active');
  modalContent.classList.add('modal__content', 'modal-active');

  modal.append(modalContent);
  modalContent.append(createForm.modalBlockTitle, createForm.form);

  createForm.form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!validateClientForm()) {
      return;
    }

    const contactTypes = document.querySelectorAll('.contact__name');
    const contactValues = document.querySelectorAll('.contact__input');
    let contacts = [];
    let clientObj = {};

    for (let i = 0; i < contactTypes.length; i++) {
      if (!validateClientContact(contactTypes[i], contactValues[i])) {
        return;
      }
      contacts.push({
        type: contactTypes[i].innerHTML,
        value: contactValues[i].value
      });
    }

    clientObj.name = createForm.inputName.value;
    clientObj.surname = createForm.inputSurname.value;
    clientObj.lastName = createForm.inputLastName.value;
    clientObj.contacts = contacts;

    const spinner = document.querySelector('.modal__spinner');

    try {
        spinner.style.display = 'block';
        const data = await sendClientData(clientObj, 'POST');
        setTimeout(() => {
            document.querySelector('.table-body').append(buildTableRow(data));
            modal.remove();
        }, 1500);
    } catch (error) {
        console.log(error);
    } finally {
        setTimeout(() => spinner.style.display = 'block', 1500);
    }
  });

  createForm.modalClose.addEventListener('click', () => {
    modal.remove();
  });

  document.addEventListener('click', (e) => {
    if (e.target == modal) {
        modal.remove();
    }
  });

  createForm.modalCancel.addEventListener('click', () => {
    modal.remove();
  });

  return modal;
} 

const createContactItem = () => {
  const contact = document.createElement('div');
  const contactType = document.createElement('div');
  const contactName = document.createElement('button');
  const contactList = document.createElement('ul');
  const contactPhone = document.createElement('li');
  const contactVk = document.createElement('li');
  const contactEmail = document.createElement('li');
  const contactFb = document.createElement('li');
  const contactOther = document.createElement('li');
  const contactInput = document.createElement('input');
  const contactDelete = document.createElement('button');
  const contactDeleteTooltip = document.createElement('span');

  contact.classList.add('contact');
  contactDeleteTooltip.classList.add('contact-tooltip', 'site-tooltip');
  contactType.classList.add('contact__type');
  contactName.classList.add('contact__name');
  contactList.classList.add('contact__list');
  contactPhone.classList.add('contact__item');
  contactVk.classList.add('contact__item');
  contactFb.classList.add('contact__item');
  contactEmail.classList.add('contact__item');
  contactOther.classList.add('contact__item');
  contactInput.classList.add('contact__input');
  contactDelete.classList.add('contact__delete');

  contactName.textContent = 'Телефон';
  contactDeleteTooltip.textContent = 'Удалить контакт';
  contactPhone.textContent = 'Доп. телефон';
  contactVk.textContent = 'Vk';
  contactEmail.textContent = 'Email';
  contactFb.textContent = 'Facebook';
  contactOther.textContent = 'Другое';
  contactInput.placeholder = 'Введите данные контакта';
  contactInput.type = 'text';
  contactDelete.innerHTML = `<svg width="12" height="12" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
  <path d="M6 0C2.682 0 0 2.682 0 6C0 9.318 2.682 12 6 12C9.318 12 12 9.318 12 6C12 2.682 9.318 0 6 0ZM6 10.8C3.354 10.8 1.2 8.646 1.2 6C1.2 3.354 3.354 1.2 6 1.2C8.646 1.2 10.8 3.354 10.8 6C10.8 8.646 8.646 10.8 6 10.8ZM8.154 3L6 5.154L3.846 3L3 3.846L5.154 6L3 8.154L3.846 9L6 6.846L8.154 9L9 8.154L6.846 6L9 3.846L8.154 3Z"/>
  </svg>`;

  contactDelete.addEventListener('click', (e) => {
    e.preventDefault();
    contact.remove();
    document.querySelector('.modal__contacts-add-btn').classList.add('modal__contacts-add-btn-active');
  });

  contactName.addEventListener('click', (e) => {
    e.preventDefault();
    contactList.classList.toggle('contact__list--active');
    contactName.classList.toggle('contact__list--active');
  });

  contactType.addEventListener('mouseleave', () => {
    contactList.classList.remove('contact__list--active');
    contactName.classList.remove('contact__list--active');
  });

  const setType = (type) => {
    type.addEventListener('click', () => {
      contactName.textContent = type.textContent;
      contactList.classList.remove('contact__list--active');
      contactName.classList.remove('contact__list--active');
    });
  }

  const typesArray = [contactEmail, contactFb, contactVk, contactPhone, contactOther];

  for (const type of typesArray) {
    setType(type);
  }
  
  contactDelete.append(contactDeleteTooltip);
  contact.append(contactType, contactInput, contactDelete);
  contactType.append(contactName, contactList);
  contactList.append(contactPhone, contactVk, contactEmail, contactFb, contactOther);

  return {
    contact,
    contactName,
    contactInput,
    contactDelete
  }
}

//удаление клиента
const deleteClientModal = () => {
  const deleteModalContent = document.createElement('div');
  const modalClose = document.createElement('button');
  const deleteModalTitle = document.createElement('h2');
  const deleteModalText = document.createElement('p');
  const deleteModal = document.createElement('div');
  const deleteModalDelete = document.createElement('button');
  const deleteModalDeleteSpan = document.createElement('span');
  const deleteModalBack = document.createElement('button');
  const deleteSpinner = document.createElement('span');

  deleteSpinner.classList.add('modal__spinner');
  deleteModal.classList.add('modal', 'delete-modal', 'modal-active');
  deleteModalContent.classList.add('modal__content', 'delete-modal__content', 'modal-active');
  deleteModalText.classList.add('delete-modal__text');
  deleteModalTitle.classList.add('delete-modal__title', 'modal__title');
  deleteModalDelete.classList.add('delete-modal__delete');
  deleteModalBack.classList.add('delete-modal__back');
  modalClose.classList.add('modal__close-btn', 'modal__delete-btn');

  deleteSpinner.innerHTML = `
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3.00008 8.04008C3.00008 10.8236 5.2566 13.0801 8.04008 13.0801C10.8236 13.0801 13.0801 10.8236 13.0801 8.04008C13.0801 5.2566 10.8236 3.00008 8.04008 3.00008C7.38922 3.00008 6.7672 3.12342 6.196 3.34812" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round"/>
    </svg>`
  deleteModalTitle.textContent = 'Удалить клиента';
  deleteModalText.textContent = 'Вы действительно хотите удалить данного клиента?';
  deleteModalDeleteSpan.textContent = 'Удалить';
  deleteModalBack.textContent = 'Отмена';

  deleteModalDelete.append(deleteSpinner, deleteModalDeleteSpan);
  deleteModalContent.append(
    modalClose,
    deleteModalTitle,
    deleteModalText,
    deleteModalDelete,
    deleteModalBack
  )
  deleteModal.append(deleteModalContent);

  modalClose.addEventListener('click', () => deleteModal.remove());
  deleteModalBack.addEventListener('click', () => deleteModal.remove());

  window.addEventListener('click', (e) =>  {
    if (e.target === deleteModal) {
      deleteModal.remove();
    }
  });

  return {
    deleteModal,
    deleteModalContent,
    deleteModalDelete,
    deleteSpinner
  }
}

// изменение клиента
const editClientModal = (data) => {
  const editModal = document.createElement('div');
  const editModalContent = document.createElement('div');
  const createForm = createModal();
  const titleId = document.createElement('span');

  titleId.classList.add('modal__id');
  editModal.classList.add('modal', 'modal-active');
  editModalContent.classList.add('modal__content', 'modal-active');
  
  createForm.modalTitle.textContent = 'Изменить данные';
  createForm.modalCancel.textContent = 'Удалить клиента';
  titleId.textContent = 'ID: ' + data.id.substr(0, 6);

  createForm.modalCancel.addEventListener('click', (e) => {
    e.preventDefault();

    const deleteModal = deleteClientModal();
    document.body.append(deleteModal.deleteModal);

    deleteModal.deleteModalDelete.addEventListener('click', () => {
      try {
        deleteModal.deleteSpinner.style.display = 'block';

        setTimeout(() => {
          deleteClientItem(data.id);
          document.getElementById(data.id).remove();
          deleteModal.deleteModal.remove();
          editModal.remove();
        }, 1000);
      } catch (error) {
        console.log(error);
      } finally {
        setTimeout(() => deleteModal.deleteSpinner.style.display = 'none', 1000);
      }
    });
  });

  createForm.modalClose.addEventListener('click', () => {
    editModal.remove();
  });

  createForm.inputName.value = data.name;
  createForm.inputSurname.value = data.surname;
  createForm.inputLastName.value = data.lastName;

  for (const contact of data.contacts) {
    const createContact = createContactItem();
    
    createContact.contactName.textContent = contact.type;
    createContact.contactInput.value = contact.value;

    createForm.contactsDiv.append(createContact.contact);
    createForm.contactsBlock.style.backgroundColor = '#eeeef1';
  }

  if (data.contacts.length == 10) {
    createForm.addContactBtn.classList.remove('modal__contacts-add-btn-active');
  }

  createForm.form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!validateClientForm()) {
      return;
    }

    const contactTypes = document.querySelectorAll('.contact__name');
    const contactValues = document.querySelectorAll('.contact__input');
    let contacts = [];
    let client = {};

    for (let i = 0; i < contactTypes.length; i++) {
      if (!validateClientContact(contactTypes[i], contactValues[i])) {
        return;
      };
      contacts.push({
        type: contactTypes[i].innerHTML,
        value: contactValues[i].value
      });
    }

    client.name = createForm.inputName.value;
    client.surname = createForm.inputSurname.value;
    client.lastName = createForm.inputLastName.value;
    client.contacts = contacts;

    const spinner = document.querySelector('.modal__spinner');
    
    try {
      spinner.style.display = 'block';
      const editData = await sendClientData(client, 'PATCH', data.id);
      setTimeout(() => {
        document.getElementById(editData.id).remove();
        document.querySelector('.table-body').append(buildTableRow(editData));
        editModal.remove();
      }, 1000);
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => spinner.style.display = 'none', 1000);
    }
  });

  createForm.modalTitle.after(titleId);
  editModalContent.append(createForm.modalBlockTitle, createForm.form);
  editModal.append(editModalContent);

  document.addEventListener('click', (e) => {
    if (e.target == editModal) {
      editModal.remove();
    }
  });

  return {
    editModal,
    editModalContent
  }
}

//валидация формы
const validateClientForm = () => {
  const clientName = document.getElementById('modalName');
  const clientSurname = document.getElementById('modalSurname');
  const clientLastName = document.getElementById('modalLastName');
  const wrongLetter = document.getElementById('wrongLetter');
  const writeName = document.getElementById('writeName');
  const writeSurname = document.getElementById('writeSurname');
  const writeLastName = document.getElementById('writeLastName');
  const requiredValue = document.getElementById('requiredValue');
  const requiredContacts = document.getElementById('requiredContacts');
  const validateArray = [wrongLetter, writeName, writeSurname, writeLastName, requiredValue, requiredContacts];
  const regexp = /[^а-яА-ЯёЁ]+$/g;

  const onInputValue = input => {
    input.addEventListener('input', () => {
      input.style.borderColor = 'var(--color-grey)';
      for (const item of validateArray) {
        item.textContent = '';
      }
    });

    input.oncut = input.oncopy = input.onpaste = () => {
      input.style.borderColor = 'var(--color-grey)';
      for (const item of validateArray) {
        item.textContent = '';
      }
    };

    input.onchange = () => {
      input.style.borderColor = 'var(--color-grey)';
      
      if (clientSurname.value && clientName.value && clientLastName.value) {
        for (const item of validateArray) {
          item.textContent = '';
        }
      }
    };
  };

  onInputValue(clientName);
  onInputValue(clientSurname);
  onInputValue(clientLastName);

  const checkRequiredName = (input, message, name) => {
    if (!input.value) {
      input.style.borderColor = 'var(--color-red)';
      message.textContent = `Введите ${name} клиента`;
      return false;
    } else {
      message.textContent = '';
    }
    return true;
  };

  const checkByRegexp = (input, regexp) => {
    if (regexp.test(input.value)) {
      input.style.borderColor = 'var(--color-red)';
      wrongLetter.textContent = 'Недопустимые символы!';
      return false;
    } 
    return true;
  };

  if (!checkRequiredName(clientSurname, writeSurname, 'фамилию')) {return false};
  if (!checkRequiredName(clientName, writeName, 'имя')) {return false};
  if (!checkRequiredName(clientLastName, writeLastName, 'отчество')) {return false};
  if (!checkByRegexp(clientSurname, regexp)) {return false};
  if (!checkByRegexp(clientName, regexp)) {return false};
  if (!checkByRegexp(clientLastName, regexp)) {return false};

  return true;
};

//валидация контактов
const validateClientContact = (contactType, contactInput) => {
  const writeValue = document.getElementById('writeName');
  const onlyNumbers = /[^0-9]+$/g;
  const onlyEmail = /[^a-zA-Z|@|.]+$/g;

  const onInputValue = input => {
    input.addEventListener('input', () => {
      input.style.borderColor = 'var(--color-grey)';
      writeValue.textContent = '';
    });

    input.oncut = input.oncopy = input.onpaste = () => {
      input.style.borderColor = 'var(--color-grey)';
      writeValue.textContent = '';
    };
  };

  const showErrorMessage = (message, block, input) => {
    block.textContent = message;
    input.style.borderColor = 'var(--color-red)';
  };

  onInputValue(contactInput);

  if (!contactInput.value) {
    showErrorMessage('Заполните все поля контактов!', writeValue, contactInput);
    return false;
  }

  switch (contactType.innerHTML) {
    case 'Телефон':
      if (onlyNumbers.test(contactInput.value)) {
        showErrorMessage('Допустимы только цифры', writeValue, contactInput);
        return false;
      } else if (contactInput.value.length !== 11) {
        showErrorMessage('Номер должен состоять из 11 цифр!', writeValue, contactInput);
        return false;
      }

      return true;
    case 'Email':
      if (onlyEmail.test(contactInput.value)) {
        showErrorMessage('Неправильный Email!', writeValue, contactInput);
        return false;
      }

      return true;
    default:
      return true;
  }
};

// сортировка таблицы
const sortTable = () => {
  const table = document.querySelector('table');
  const headers = table.querySelectorAll('th');
  const tbody = table.querySelector('tbody');
  const directions = Array.from(headers).map(() => '');

  const transform = (type, content) => {
    switch (type) {
      case 'id':
        return parseFloat(content);
      case 'create':
      case 'update':
        return content.split('.').reverse().join('-');
      case 'text':
      default:
        return content;
    }
  }

  const sortColumn = (index) => {
    const type = headers[index].getAttribute('data-type');
    const rows = tbody.querySelectorAll('tr');
    const direction = directions[index] || 'sortUp';
    const changeDirection = direction === 'sortUp' ? 1 : -1;
    const newRows = Array.from(rows);

    newRows.sort((row1, row2) => {
      const cellA = row1.querySelectorAll('td')[index].textContent;
      const cellB = row2.querySelectorAll('td')[index].textContent;
      const a = transform(type, cellA);
      const b = transform(type, cellB);

      switch(true) {
        case a > b:
          return 1 * changeDirection;
        case a < b:
          return -1 * changeDirection;
        default: 
          break;
        case a === b:
          return 0;
      }
    });

    [].forEach.call(rows, (row) => {
      tbody.removeChild(row);
    });

    directions[index] = direction === 'sortUp' ? 'sortDown' : 'sortUp';

    newRows.forEach(newRow => {
      tbody.appendChild(newRow);
    })
  }

  [].forEach.call(headers, (header, index) => {
    header.addEventListener('click', () => {
      sortColumn(index);

      //изменение стрелок при сортировке
      if (header.classList.contains('sort-down')) {
        header.classList.remove('sort-down');
        header.classList.add('sort-up');
      } else {
        header.classList.remove('sort-up');
        header.classList.add('sort-down');
      }
    });
  });
};

//поиск по таблице
const searchClients = (clients) => {
  const findList = document.querySelector('.find-list');
  const input = document.querySelector('.header__input');

  //clients.forEach(client => {
    //const findItem = document.createElement('li');
    //const findLink = document.createElement('a');

    //findItem.classList.add('find-list__item');
    //findLink.classList.add('find-list__link');

    //findLink.textContent = `${client.surname} ${client.name} ${client.lastName}`;
    //findLink.href = '#';

    //findItem.append(findLink);
    //findList.append(findItem);
  //});

  //перерисовка таблицы
  const rewriteTable = async (str) => {
    const response = await findClient(str);
    const tbody = document.querySelector('.table-body');
    tbody.innerHTML = '';

    for (const client of response) {
      tbody.append(buildTableRow(client));
    }
  }

  input.addEventListener('input', async () => {
    const value = input.value.trim();
    const foundItems = document.querySelectorAll('.find-list__link');

    if (value !== '') {
      rewriteTable(value);

      foundItems.forEach(link => {
        if (link.innerText.search(value) == -1) {
          link.classList.add('hide');
          link.innerHTML = link.innerText;
        } else {
          link.classList.remove('hide');
          findList.classList.remove('hide');
          const str = link.innerText;
          link.innerHTML = insertMark(str, link.innerText.search(value), value.length)
        }
      });
    } else {
      foundItems.forEach(link => {
        const tbody = document.querySelector('.table-body');
        tbody.innerHTML = '';

        clients.forEach(client => tbody.append(buildTableRow(client)));

        link.classList.remove('hide');
        findList.classList.add('hide');
        link.innerHTML = link.innerText;
      })
    }
  });

  //выделение совпадений по поиску
  //const insertMark = (str, pos, len) => str
  //.slice(0, pos) + '<mark>' + str
  //.slice(pos, pos + len) + '</mark>' + str
  //.slice(pos + len);
}


//создание страницы
const createApp = async () => {
  const header = createHeader();
  const clientTableThead = createTableThead();
  document.body.append(header, clientTableThead.section);
  const preloader = document.querySelector('.preloader');

  try {
    const clients = await getClientsData();
    searchClients(clients);
    for (const client of clients) {
      document.querySelector('.table-body').append(buildTableRow(client))
    }  

  } catch (error) {
    console.log(error);
  } finally {
    setTimeout(() => preloader.remove(), 1000);
  }
};

createApp();
document.addEventListener('DOMContentLoaded', sortTable);







