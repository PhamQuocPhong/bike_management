<template>
<v-app id="login">
  <v-container
        fluid
        fill-height
      >

      <v-row>
        <v-layout
        align-center
        justify-center
        >
            <v-flex
              xs12
              sm8
              md4
            >

              <v-card class="elevation-12">
                <v-toolbar
                  color="primary"
                  dark
                  flat
                >

                  <v-toolbar-title class="text-center">
                     Sign Up  
                  </v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                  <v-form
                  ref="form"
                  v-model="valid"
                  :lazy-validation="lazy"
                  >

                    <v-text-field
                      id="email"
                      label="Email"
                      prepend-icon="email"
                      type="email"
                      v-model="newUser.email"
                      :rules="emailRules"
                    ></v-text-field>

                    <v-text-field
                      label="Password"
                      prepend-icon="lock"
                      type="password"
                      v-model="newUser.password"
                      :rules="passwordRules"
                    ></v-text-field>

                    <v-text-field
                      label="Phone Number"
                      prepend-icon="mdi-phone"
                      type="number"
                      v-model="newEmployee.phoneNumber"
                      :rules="phoneNumberRules"
                    ></v-text-field>


                    <v-text-field
                      label="Full Name"
                      prepend-icon="mdi-hand-pointing-right"
                      type="text"
                      v-model="newEmployee.fullName"
                      :rules="fullNameRules"
                    ></v-text-field>

                    <v-btn text  class="light-blue--text" link @click="redirectLogin">
                        Back to Login   
                        <v-icon >mdi-login-variant</v-icon> 
                    </v-btn>

                  </v-form>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" @click="register">Sign up</v-btn>
                </v-card-actions>
              </v-card>

            </v-flex>
        </v-layout>
      </v-row>
  </v-container>
</v-app>
</template>

<script>

import User from '@/store/models/user'
import Employee from '@/store/models/employee'
import Auth from '@/services/auth'
export default {

  data(){
    return{
      valid: true,
      lazy: false,
      passwordRules: [
        v => !!v || 'Password is required!'
      ],
      emailRules: [
        v => !!v || 'Email is required!',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      phoneNumberRules: [
        v => !!v || 'Phone number is required!',
      ],
      fullNameRules: [
        v => !!v || 'Name is required!',
      ],
    }    
  },

  mounted(){
   
  },

  methods: {
   async register(){

      if (this.$refs.form.validate()) {

        var data =  {...this.newUser, ...this.newEmployee};
        Auth.register(data).then(res => {

          if(res.status === 200){
             toastr.success('<p> A message be sent to your email</p> <p>Verify your account to login!</p>', 'Register Success!', {timeOut: false})
              this.$refs.form.reset()
          } else if(res.status === 401){
            toastr.error(res.data.message, 'Error', {timeOut: 1000})
          }else if(res.status === 500){
            toastr.error('Internal Server Error', 'Error', {timeOut: 1000})
          }
        })
      }
    },

    redirectLogin(){
      this.$router.push('/auth/login')
    }

  },
  computed: {
    newUser(){
      return new User()
    },
    newEmployee(){
      return new Employee()
    }
  }
}

</script>
