import React, { useState } from 'react';

interface Props {}

export default function App(props: Props) {
  return (
    <div>
      <h1>Does this work</h1>
    </div>
  );
}

// import React, { Component } from 'react';
// import axios from 'axios';
// import '../css/creation.css';
// import Header from './Header';
// import NameInput from './Creation/NameInput';
// import NumberInput from './Creation/NumberInput';
// import Avatar from './Creation/Avatar';
// import DefaultChar from './Creation/DefaultChar';
// // import QuestionMarkInfo from './Creation/QuestionMarkInfo';

// export default class Creation extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       firstName: '',
//       lastName: '',
//       str: '',
//       dex: '',
//       con: '',
//       int: '',
//       wis: '',
//       cha: '',
//       bio: '',
//       avatar: '',
//       id: 0,
//     };
//   }

//   componentDidMount = () => {
//     if (this.props.id > 0) {
//       axios
//         .get(`/api/characters/${this.props.id}`)
//         .then((res) => {
//           const {
//             firstName,
//             lastName,
//             str,
//             dex,
//             con,
//             int,
//             wis,
//             cha,
//             bio,
//             avatar,
//             id,
//             gold,
//             inventory,
//           } = res.data[0];

//           this.setState({
//             firstName,
//             lastName,
//             str: +str,
//             dex: +dex,
//             con: +con,
//             int: +int,
//             wis: +wis,
//             cha: +cha,
//             bio,
//             avatar,
//             id: +id,
//             gold: +gold,
//             inventory,
//           });
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//     }
//   };

//   componentDidUpdate(prevProps, prevState) {
//     if (prevState.id !== this.state.id) {
//       this.props.handleUpdateId(this.state.id);
//     }
//   }

//   handleUpdateUserInput = (e) => {
//     this.setState({
//       [e.target.name]: e.target.value,
//     });
//   };

//   handleUpdateUserInputNumbers = (e) => {
//     this.setState({
//       [e.target.name]: +e.target.value,
//     });
//   };

//   handleDefaultChar = (obj) => {
//     const {
//       firstName,
//       lastName,
//       str,
//       dex,
//       con,
//       int,
//       wis,
//       cha,
//       bio,
//       avatar,
//       id,
//     } = obj;

//     this.setState({
//       firstName,
//       lastName,
//       str: +str,
//       dex: +dex,
//       con: +con,
//       int: +int,
//       wis: +wis,
//       cha: +cha,
//       bio,
//       avatar,
//       id: +id,
//     });

//     this.props.handleShowShopToFalse();
//   };

//   handleSubmitCharSheet = () => {
//     const {
//       firstName,
//       lastName,
//       str,
//       dex,
//       con,
//       int,
//       wis,
//       cha,
//       bio,
//       avatar,
//       id,
//     } = this.state;

//     if (id > 0 && id < 5) {
//       axios
//         .put(`/api/characters/${this.state.id}`, {
//           firstName,
//           lastName,
//           str,
//           dex,
//           con,
//           int,
//           wis,
//           cha,
//           bio,
//           avatar,
//         })
//         .then(this.props.handleUpdateId(this.state.id))
//         .catch((error) => {
//           console.log(error);
//         });
//     } else {
//       axios
//         .post('/api/characters', {
//           firstName,
//           lastName,
//           str,
//           dex,
//           con,
//           int,
//           wis,
//           cha,
//           bio,
//           avatar,
//         })
//         .then((res) => {
//           this.props.handleUpdateId(res.data.id);
//         })
//         .catch((error) => {
//           console.log(error);
//         });
//     }
//   };

//   render() {
//     return (
//       <div className="creation">
//         <Header header={`Create Your Own D&D 5E Character!`} />
//         <section className="creation-container">
//           <article className="article1">
//             <div className="names">
//               <NameInput
//                 name="firstName"
//                 value={this.state.firstName}
//                 handleUpdateUserInput={this.handleUpdateUserInput}
//               />
//               <NameInput
//                 name="lastName"
//                 value={this.state.lastName}
//                 handleUpdateUserInput={this.handleUpdateUserInput}
//               />
//             </div>

//             <div className="numbers">
//               {this.props.abilityNames.map((val, i) => {
//                 return (
//                   <div key={i}>
//                     <NumberInput
//                       name={val}
//                       value={this.state[val]}
//                       handleUpdateUserInput={this.handleUpdateUserInputNumbers}
//                       key={val}
//                       indexNumberForSkillExplanation={i}
//                     />
//                   </div>
//                 );
//               })}
//             </div>

//             <textarea
//               name="bio"
//               value={this.state.bio}
//               onChange={this.handleUpdateUserInput}
//               placeholder="Write your Bio here!"
//             />
//           </article>
//           <article className="article2">
//             <DefaultChar handleDefaultChar={this.handleDefaultChar} />
//             <Avatar
//               name="avatar"
//               handleUpdateUserInput={this.handleUpdateUserInput}
//             />
//             {this.state.avatar ? (
//               <img
//                 src={this.state.avatar}
//                 alt="Avatar"
//                 className="avatar-img"
//               />
//             ) : null}

//             <button
//               className="doneBTN"
//               onClick={() => {
//                 this.handleSubmitCharSheet();
//                 this.props.handleShowShop();
//               }}
//             >
//               Done!
//             </button>
//           </article>
//         </section>
//       </div>
//     );
//   }
// }
