<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div>
      <div v-for="(member, index) in members" :key="index">
        <Members :first-name="member.firstName" :last-name="member.lastName" v-on:increase-salary="customEvent" />
        {{ getFullName(member) }} - {{ member.salary }}
        <button :id="member.id" @click="increaseSalary($event)">Increase</button>
        <div :class="{'text-primary': member.id < 2, 'font-bold': member.salary > 50}">{{ member.firstName }}</div>
        <div :class="['text-red-500', member.salary > 50 ? 'font-bold' : 'font-medium']">{{ member.lastName }}</div>
      </div>
      <img src="../../public/christina-wocintechchat-com-0g-iLtxmMhA-unsplash.jpg" class="aspect-square w-32 object-cover" alt="">
    </div>
    {{ fullName }}
    <div v-if="members.length > 3">Nhieu hon 3 thanh vien</div>
    <div v-else-if="members.length === 3">Co 3 thanh vien</div>
    <div v-else>It hon 3 thanh vien</div>

    <form class="bg-primary" @submit.prevent="handleSubmit">
      <input type="text" v-model="form.name" placeholder="Name">
      <input type="text" v-model="form.author" placeholder="Author">
      <input type="number" v-model.number="form.price" placeholder="Price">
      <label>
        <input type="checkbox" v-model="form.isLimited">
        Is limited
      </label>
      <button type="submit">Submit</button>
    </form>

    <p>
      For a guide and recipes on how to configure / customize this project,<br>
      check out the
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener">vue-cli documentation</a>.
    </p>
    <h3>Installed CLI Plugins</h3>
    <ul>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel" target="_blank" rel="noopener">babel</a></li>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint" target="_blank" rel="noopener">eslint</a></li>
    </ul>
    <h3>Essential Links</h3>
    <ul>
      <li><a href="https://vuejs.org" target="_blank" rel="noopener">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank" rel="noopener">Forum</a></li>
      <li><a href="https://chat.vuejs.org" target="_blank" rel="noopener">Community Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank" rel="noopener">Twitter</a></li>
      <li><a href="https://news.vuejs.org" target="_blank" rel="noopener">News</a></li>
    </ul>
    <h3>Ecosystem</h3>
    <ul>
      <li><a href="https://router.vuejs.org" target="_blank" rel="noopener">vue-router</a></li>
      <li><a href="https://vuex.vuejs.org" target="_blank" rel="noopener">vuex</a></li>
      <li><a href="https://github.com/vuejs/vue-devtools#vue-devtools" target="_blank" rel="noopener">vue-devtools</a></li>
      <li><a href="https://vue-loader.vuejs.org" target="_blank" rel="noopener">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank" rel="noopener">awesome-vue</a></li>
    </ul>
  </div>
</template>

<script>
import Members from "@/components/Members";
export default {
  name: 'HelloWorld',
  components: {Members},
  props: {
    msg: String
  },
  data() {
    return {
      members: [
        {
          id: 1,
          firstName: 'Khanh',
          lastName: 'Troll',
          birth: 1993,
          salary: 50
        },
        {
          id: 2,
          firstName: 'Ngoc',
          lastName: 'Luon',
          birth: 2000,
          salary: 500
        }
      ],
      form: {
        name: null,
        author: null,
        price: 0,
        isLimited: false
      },
      showMessage: false,
      firstName: 'Khanh',
      lastName: 'Troll',
      attributes: ['id', 'abc']
    }
  },
  created() {

    this.form = {
      name: 'HP',
      author: 'JKR',
      price: 50,
      isLimited: false
    };
  },
  methods: {
    customEvent() {
      alert(1);
    },
    getFullName(member) {
      return member.firstName + ' ' + member.lastName;
    },
    increaseSalary(e){
      console.log(e);
      // this.members.filter(e => {
      //   if (e.id === id){
      //     e.salary += 1000;
      //   }
      // })
    },
    handleSubmit() {
      console.log(this.form);
    }
  },
  computed: {
    fullName() {
      return this.firstName + ' ' + this.lastName;
    }
  },
  watch: {
    'form.isLimited': function (newValue, oldValue) {
      console.log('new value: ' + newValue);
      console.log('old value: ' + oldValue);
      if (newValue) {
        this.form.price = 100;
      }
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
