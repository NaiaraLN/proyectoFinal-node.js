export default class UserDTO{
    constructor({username,mail,phone,address,age,avatar},admin){
        this.username = username;
        this.mail = mail;
        this.phone = phone;
        this.address = address;
        this.age = age;
        this.avatar = avatar.toString();
        this.admin= admin
    }
}