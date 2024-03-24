import REQUEST from "../api";

const fakeData = () => {
  const data = [
    {
      name: "Davies",
      password: "Ch123***",
      image:
        "https://img.a.transfermarkt.technology/portrait/small/424204-1667830391.jpg?lm=1",
      email: "davies@gmail.com",
    },
    {
      name: "Salah",
      password: "Ch123***",
      image:
        "https://img.a.transfermarkt.technology/portrait/small/148455-1700651360.jpg?lm=1",
      email: "Salah@gmail.com",
    },
    {
      name: "Haaland",
      password: "Ch123***",
      image:
        "https://img.a.transfermarkt.technology/portrait/small/418560-1709108116.png?lm=1",
      email: "Haaland@gmail.com",
    },
    {
      name: "Bellingham",
      password: "Ch123***",
      image:
        "https://img.a.transfermarkt.technology/portrait/small/581678-1693987944.jpg?lm=1",
      email: "Bellingham@gmail.com",
    },
    {
      name: "Mbappe",
      password: "Ch123***",
      image:
        "https://img.a.transfermarkt.technology/portrait/small/342229-1682683695.jpg?lm=1",
      email: "Mbappe@gmail.com",
    },
    {
      name: "Saka",
      password: "Ch123***",
      image:
        "https://img.a.transfermarkt.technology/portrait/small/433177-1684155052.jpg?lm=1",
      email: "Saka@gmail.com",
    },
    {
      name: "Martinez",
      password: "Ch123***",
      image:
        "https://img.a.transfermarkt.technology/portrait/small/406625-1695024988.jpg?lm=1",
      email: "Martinez@gmail.com",
    },
    {
      name: "Szoboszlai",
      password: "Ch123***",
      image:
        "https://img.a.transfermarkt.technology/portrait/small/451276-1700209677.jpg?lm=1",
      email: "Szoboszlai@gmail.com",
    },
    {
      name: "Barella",
      password: "Ch123***",
      image:
        "https://img.a.transfermarkt.technology/portrait/small/255942-1661353022.jpg?lm=1",
      email: "Barella@gmail.com",
    },
    {
      name: "Bastoni",
      password: "Ch123***",
      image:
        "https://img.a.transfermarkt.technology/portrait/small/315853-1695027553.jpg?lm=1",
      email: "Bastoni@gmail.com",
    },
    {
      name: "Mostafa",
      password: "Ch123***",
      image:
        "https://img.a.transfermarkt.technology/portrait/medium/462348-1703065403.jpg?lm=1",
      email: "Mostafa@gmail.com",
    },
    {
      name: "Marmoush",
      password: "Ch123***",
      image:
        "https://img.a.transfermarkt.technology/portrait/medium/445939-1696508916.jpg?lm=1",
      email: "Marmoush@gmail.com",
    },
    {
      name: "Trezeguet",
      password: "Ch123***",
      image:
        "https://img.a.transfermarkt.technology/portrait/medium/234189-1695671609.png?lm=1",
      email: "Trezeguet@gmail.com",
    },
  ];
  data.forEach(e=>{
    REQUEST.CHATAPP_API.post("http://localhost:5000/api/user/signup",e)
  })
};

export default fakeData;
