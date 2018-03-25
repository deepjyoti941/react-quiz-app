const students = [
  {key: '', value: 'Select student Id'},
  {key: 'deepk', value: 'deepjyoti'},
  {key: 'deepJ', value: 'khakhlary'},
  {key: 'deepP', value: 'deepjyoti khakhlary'},
  {key: 'demo1', value: 'demo1'},
  {key: 'demo2', value: 'demo2'}
]
const StorageHelper = {
  setItem: function(key, value) {
    return Promise.resolve().then(function() {
      localStorage.setItem(key, value);
    });
  },
  getItem: function(key) {
    return Promise.resolve().then(function() {
      return localStorage.getItem(key);
    });
  },

  deleteItem: function(key) {
    return Promise.resolve().then(function() {
      return localStorage.removeItem(key);
    });
  },

  studentList: function() {
    return Promise.resolve().then(function() {
      return students;
    });
  }
};

export default StorageHelper;
