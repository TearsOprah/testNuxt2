import { observable } from 'mobx';

const store = observable({
  sortOrder: 'asc',
  currentPage: 1,
});

export default store;
