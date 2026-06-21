import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const contacts = [
  // ── числові номери ──
  { schoolNumber: '1',   contactName: 'Надія Михайлівна',          phone: '0975695519', role: 'Завуч' },
  { schoolNumber: '2',   contactName: 'Наталя',                     phone: '0974064095', role: 'Завуч' },
  { schoolNumber: '5',   contactName: 'Лариса',                     phone: '0673622534', role: 'Директор' },
  { schoolNumber: '9',   contactName: 'Віра Ярославівна',           phone: '0674935124', role: 'Директор' },
  { schoolNumber: '9',   contactName: 'Леся',                       phone: '0673380894', role: 'Завуч' },
  { schoolNumber: '13',  contactName: 'Марта Романівна',            phone: '0675839806', role: 'Директор' },
  { schoolNumber: '15',  contactName: 'Ірина Андріївна',            phone: '0679062500', role: 'Завуч' },
  { schoolNumber: '17',  contactName: 'Ельвіра',                    phone: '0678578514', role: 'Педорг' },
  { schoolNumber: '18',  contactName: 'Роман',                      phone: '0972587179', role: 'Завуч' },
  { schoolNumber: '20',  contactName: 'Наталя Іванівна',            phone: '0506747111', role: 'Завуч' },
  { schoolNumber: '23',  contactName: 'Микола Шостак',              phone: '0632232178', role: 'Педорг' },
  { schoolNumber: '27',  contactName: 'Романа Михайлівна',          phone: '0973113778', role: 'Завуч' },
  { schoolNumber: '27',  contactName: 'Наталя Куліш',               phone: '0677552743', role: 'Завуч' },
  { schoolNumber: '28',  contactName: 'Олена Олегівна',             phone: '0679243130', role: 'Завуч' },
  { schoolNumber: '30',  contactName: 'Світлана Михальвіна',        phone: '0974436542', role: 'Завуч' },
  { schoolNumber: '30',  contactName: 'Ольга Володимирівна',        phone: '0679596199', role: 'Завуч' },
  { schoolNumber: '31',  contactName: 'Христина Ярославівна',       phone: '0983804403', role: 'Директор' },
  { schoolNumber: '31',  contactName: 'Леся Оресівна',              phone: '0673567679', role: 'Завуч' },
  { schoolNumber: '34',  contactName: 'Мирон',                      phone: '0938668520', role: 'Педорг' },
  { schoolNumber: '36',  contactName: 'Тетяна',                     phone: '0990407941', role: 'Завуч' },
  { schoolNumber: '40',  contactName: 'Юлія',                       phone: '0976015839', role: 'Педорг' },
  { schoolNumber: '40',  contactName: 'Ірина',                      phone: '0673021531', role: 'Педорг' },
  { schoolNumber: '40',  contactName: 'Номер школи',                phone: '0322622002', role: null },
  { schoolNumber: '44',  contactName: 'Стефанович Людмила Олександрівна', phone: '0677838274', role: 'Директор' },
  { schoolNumber: '45',  contactName: 'Наталія Аркадіївна',         phone: '0677123961', role: 'Завуч' },
  { schoolNumber: '46',  contactName: 'Ірина Іларіонівна',          phone: '0676969337', role: 'Завуч' },
  { schoolNumber: '46',  contactName: 'Юля',                        phone: '0961791595', role: 'Педорг' },
  { schoolNumber: '48',  contactName: 'Роман Васильович',           phone: '0982310957', role: 'Директор' },
  { schoolNumber: '49',  contactName: 'Уляна',                      phone: '0681371457', role: 'Педорг' },
  { schoolNumber: '50',  contactName: "Мар'яна Іванівна",           phone: '0674901746', role: 'Завуч' },
  { schoolNumber: '51',  contactName: 'Ірина Миколаївна',           phone: '0972595956', role: 'Завуч' },
  { schoolNumber: '52',  contactName: 'Світлана',                   phone: '0677070497', role: 'Директор' },
  { schoolNumber: '54',  contactName: 'Любов Іванівна',             phone: '0677715647', role: 'Завуч' },
  { schoolNumber: '60',  contactName: 'Людмила',                    phone: '0973888255', role: 'Директор' },
  { schoolNumber: '63',  contactName: 'Іванець Ольга Євгенівна',    phone: '0977345920', role: 'Завуч' },
  { schoolNumber: '65',  contactName: 'Марія',                      phone: '0975391164', role: 'Педорг' },
  { schoolNumber: '66',  contactName: 'Мирослава',                  phone: '0977711381', role: 'Завуч' },
  { schoolNumber: '66',  contactName: 'Назар Оксана',               phone: '0679686514', role: 'Завуч' },
  { schoolNumber: '67',  contactName: 'Оксана Володимирівна',       phone: '0673705262', role: 'Завуч' },
  { schoolNumber: '68',  contactName: 'Уляна',                      phone: '0973004954', role: 'Педорг' },
  { schoolNumber: '69',  contactName: 'Тетяна Володимирівна',       phone: '0673041659', role: 'Завуч' },
  { schoolNumber: '70',  contactName: 'Марта',                      phone: '0676726984', role: 'Директор' },
  { schoolNumber: '70',  contactName: 'Марія',                      phone: '0966063264', role: 'Завуч' },
  { schoolNumber: '71',  contactName: 'Марія',                      phone: '0676644983', role: 'Педорг' },
  { schoolNumber: '71',  contactName: 'Роман',                      phone: '0677514127', role: 'Директор' },
  { schoolNumber: '72',  contactName: 'Олена Михайлівна',           phone: '0677948577', role: 'Завуч' },
  { schoolNumber: '73',  contactName: 'Світлана Богданівна',        phone: '0971844043', role: 'Директор' },
  { schoolNumber: '73',  contactName: 'Інна Євгенівна',             phone: '0678829581', role: 'Завуч' },
  { schoolNumber: '80',  contactName: 'Наталя',                     phone: '0967331419', role: 'Завуч' },
  { schoolNumber: '81',  contactName: 'Галина Антонівна',           phone: '0673662853', role: 'Завуч' },
  { schoolNumber: '81',  contactName: 'Андріана',                   phone: '0502867516', role: 'Завуч' },
  { schoolNumber: '84',  contactName: 'Тетяна Іванівна',            phone: '0974437171', role: 'Завуч' },
  { schoolNumber: '86',  contactName: 'Руслана Василівна',          phone: '0964066413', role: 'Директор' },
  { schoolNumber: '86',  contactName: 'Анна',                       phone: '0638694484', role: 'Педорг' },
  { schoolNumber: '90',  contactName: 'Ірина Іванівна',             phone: '0974392839', role: 'Завуч' },
  { schoolNumber: '90',  contactName: 'Людмила',                    phone: '0676092693', role: 'Завуч' },
  { schoolNumber: '93',  contactName: 'Ірина Петрівна',             phone: '0966591509', role: 'Директор' },
  { schoolNumber: '95',  contactName: 'Марія Орестівна',            phone: '0979515318', role: 'Завуч' },
  { schoolNumber: '95',  contactName: 'Ірина',                      phone: '0972392191', role: 'Педорг' },
  { schoolNumber: '96',  contactName: 'Любов',                      phone: '0689529174', role: 'Педорг' },
  { schoolNumber: '97',  contactName: 'Наталя Любомирівна',         phone: '0961390913', role: 'Завуч' },
  { schoolNumber: '123', contactName: 'Марія Андріївна',            phone: '0679334856', role: 'Директор' },

  // ── назви без номера ──
  { schoolNumber: 'Арніка',              contactName: 'Світлана Михайлівна',  phone: '0979325399', role: 'Педорг' },
  { schoolNumber: 'Гроно',              contactName: 'Оксана Теодорівна',    phone: '0971147211', role: 'Завуч' },
  { schoolNumber: 'Джерельце',          contactName: 'Світлана Петрівна',    phone: '0673140267', role: 'Завуч' },
  { schoolNumber: 'Дивосвіт',           contactName: 'Наталя Миколаївна',    phone: '0932196651', role: 'Педорг' },
  { schoolNumber: 'Європейський ліцей', contactName: 'Галина Богданівна',    phone: '0974829920', role: 'Завуч' },
  { schoolNumber: 'Лідер',              contactName: 'Вадим',                phone: '0687584626', role: 'Педорг' },
  { schoolNumber: 'Лідер',              contactName: 'Іванка',               phone: '0965150436', role: 'Завуч' },
  { schoolNumber: 'Ліцей Львів',        contactName: 'Мирослава Іванівна',   phone: '0673536774', role: 'Завуч' },
  { schoolNumber: 'Ліцей Пулюя',        contactName: 'Наталя',               phone: '0671794604', role: 'Завуч' },
  { schoolNumber: 'Ліцей Стуса',        contactName: 'Тетяна',               phone: '0984989494', role: 'Завуч' },
  { schoolNumber: 'Оріяна',             contactName: 'Ірина Богданівна',     phone: '0673702402', role: 'Директор' },
  { schoolNumber: 'Оріяна',             contactName: 'Юрій',                 phone: '0974751935', role: 'Педорг' },
  { schoolNumber: 'Первоцвіт',          contactName: 'Христина Іванівна',    phone: '0677573109', role: 'Директор' },
  { schoolNumber: 'Провесінь',          contactName: 'Сергій',               phone: '0506020447', role: 'Педорг' },
  { schoolNumber: 'Провесінь',          contactName: 'Анджела',              phone: '0676606897', role: 'Педорг' },
  { schoolNumber: 'Світанок',           contactName: 'Лідія Миколаївна',     phone: '0679269319', role: 'Директор' },
  { schoolNumber: 'Світанок',           contactName: 'Ореста Шот',           phone: '0677018705', role: 'Завуч' },
  { schoolNumber: 'Світанок',           contactName: 'Ірина',                phone: '0674398980', role: 'Завуч' },
  { schoolNumber: 'Симоненка',          contactName: 'Уляна',                phone: '0969135903', role: 'Завуч' },
  { schoolNumber: 'Сихівський ліцей',   contactName: 'Надія',                phone: '0964667179', role: 'Завуч' },
  { schoolNumber: 'Початкова Школа Радості', contactName: 'Тетяна',          phone: '0967320197', role: 'Завуч' },
  { schoolNumber: 'Початкова Школа Радості', contactName: 'Наталя',          phone: '0674244920', role: 'Педорг' },
  { schoolNumber: 'Альфа',              contactName: 'Ірина',                phone: '0935122623', role: 'Завуч' },
];

async function main() {
  console.log('Seeding school contacts...');
  await prisma.schoolContact.deleteMany({});
  for (const c of contacts) {
    await prisma.schoolContact.create({
      data: { city: 'Львів', ...c },
    });
  }
  console.log(`Done: ${contacts.length} contacts inserted`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
  