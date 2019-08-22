const BLOG_BODY = `
Lorem ipsum dolor sit amet, ne saepe doming duo, vel ad liber evertitur. Vim et denique vivendum invenire, ullum soluta efficiendi vim id. Deserunt electram ei vel, his an veri harum ignota. Duo utinam recusabo signiferumque ad, legimus tractatos eam ne, eam ea ferri facilis. Labores inimicus ei pro. Pro modo consul liberavisse cu, ad erat senserit vel.

In vel dicam facilisis, vix ne eripuit euismod. Qui constituam definitiones at. Ei mei iisque euripidis, vis eu alia fierent, in quo evertitur sententiae. Primis nostrum ei vis. Nam numquam feugiat te.

Autem populo usu in. Vim molestie lucilius in, omnes feugait phaedrum has ad. Mea euripidis assueverit et. Cum ex fugit affert. Aperiri discere legendos cu sed. Mucius habemus quo ne.

Sit in labores fierent dignissim, id per soleat officiis. Ea duo brute mediocrem necessitatibus, ea tation ancillae ius. Sea dico ullum torquatos te, velit debet latine ei est. Vero saepe maiestatis ex sed, eligendi suscipit ei qui, augue legere voluptatibus no nam. Ei tation impedit sed, eu esse modus invenire eum.

Ceteros ocurreret repudiandae et est, eam id neglegentur deterruisset. Id mea nibh facilisi intellegam. Ad dictas comprehensam pro. Dicta theophrastus mea ei. Vis tota delectus et, mutat nominati posidonium eam ne. Accumsan molestie at quo, integre gubergren mediocritatem id has.
`;

const _randomTimestamp = () =>
  Date.now() - 10 * Math.round(Math.random() * (24 * 60 * 60 * 1000));

export const testEmail = "test@cunghoclaptrinh.online";
export const testPassword = "123456";

export const users = [
  {
    id: "1",
    name: "Phong Nguyen",
    avatar: "https://i.pravatar.cc/300?u=Phong%20Nguyen",
    about: "A senior developer who loves to teach."
  },
  {
    id: "2",
    name: "Mai Mai",
    avatar: "https://i.pravatar.cc/300?u=Mai%20Mai",
    about: "An aspiring chef."
  }
];

export const posts = [
  {
    id: "1",
    title: "Lorem ipsum dolor sit amet",
    shortDescription:
      "Lorem ipsum dolor sit amet, ne saepe doming duo, vel ad liber evertitur. Vim et denique vivendum invenire, ullum soluta efficiendi vim id. Deserunt electram ei vel, his an veri harum ignota.",
    body: BLOG_BODY,
    updatedAt: _randomTimestamp(),
    authorId: "1",
    status: "published"
  },
  {
    id: "2",
    title: "Ne saepe doming duo, vel ad liber evertitur",
    shortDescription:
      "In vel dicam facilisis, vix ne eripuit euismod. Qui constituam definitiones at. Ei mei iisque euripidis, vis eu alia fierent, in quo evertitur sententiae. Primis nostrum ei vis. Nam numquam feugiat te.",
    body: BLOG_BODY,
    updatedAt: _randomTimestamp(),
    authorId: "2",
    status: "published"
  },
  {
    id: "3",
    title: "Ceteros ocurreret repudiandae et est",
    shortDescription:
      "Autem populo usu in. Vim molestie lucilius in, omnes feugait phaedrum has ad. Mea euripidis assueverit et. Cum ex fugit affert.",
    body: BLOG_BODY,
    updatedAt: _randomTimestamp(),
    authorId: "1",
    status: "published"
  },
  {
    id: "4",
    title: "Vim et denique vivendum invenire",
    shortDescription:
      "Sit in labores fierent dignissim, id per soleat officiis. Ea duo brute mediocrem necessitatibus, ea tation ancillae ius. Sea dico ullum torquatos te, velit debet latine ei est.",
    body: BLOG_BODY,
    updatedAt: _randomTimestamp(),
    authorId: "1",
    status: "draft"
  }
];
