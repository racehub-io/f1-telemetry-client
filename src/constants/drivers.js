const createDriverObject = (abbr, firstName, lastName) => ({
  abbr,
  firstName,
  lastName,
});

const DRIVERS = [];
DRIVERS[0] = createDriverObject('SAI', 'Carlos', 'Sainz');
DRIVERS[2] = createDriverObject('RIC', 'Daniel', 'Ricciardo');
DRIVERS[3] = createDriverObject('ALO', 'Fernando', 'Alonso');
DRIVERS[6] = createDriverObject('RAI', 'Kimi', 'Raikonen');
DRIVERS[7] = createDriverObject('HAM', 'Lewis', 'Hamilton');
DRIVERS[8] = createDriverObject('ERI', 'Marcus', 'Ericsson');
DRIVERS[9] = createDriverObject('VER', 'Max', 'Verstappen');
DRIVERS[10] = createDriverObject('HUL', 'Nico', 'Hulkenburg');
DRIVERS[11] = createDriverObject('MAG', 'Kevin', 'Magnusson');
DRIVERS[12] = createDriverObject('GRO', 'Roman', 'Grosjean');
DRIVERS[13] = createDriverObject('VET', 'Sebastien', 'Vettel');
DRIVERS[14] = createDriverObject('PER', 'Sergio', 'Perez');
DRIVERS[15] = createDriverObject('BOT', 'Valterie', 'Bottas');
DRIVERS[17] = createDriverObject('OCO', 'Esteban', 'Ocon');
DRIVERS[18] = createDriverObject('VAN', 'Stoffel', 'Vandorne');
DRIVERS[19] = createDriverObject('STR', 'Lance', 'Stroll');
DRIVERS[20] = createDriverObject('BAR', 'Arron', 'Barnes');
DRIVERS[21] = createDriverObject('GIL', 'Martin', 'Giles');
DRIVERS[22] = createDriverObject('MUR', 'Alex', 'Murray');
DRIVERS[23] = createDriverObject('ROT', 'Lucas', 'Roth');
DRIVERS[24] = createDriverObject('COR', 'Igor', 'Correia');
DRIVERS[25] = createDriverObject('LEV', 'Sophie', 'Levasseur');
DRIVERS[26] = createDriverObject('SCH', 'Jonas', 'Schiffer');
DRIVERS[27] = createDriverObject('FOR', 'Alain', 'Forest');
DRIVERS[28] = createDriverObject('LET', 'Jay', 'Letorneau');
DRIVERS[29] = createDriverObject('SAA', 'Esto', 'Saari');
DRIVERS[30] = createDriverObject('ATI', 'Yasar', 'Atiyeh');
DRIVERS[31] = createDriverObject('CAL', 'Callisto', 'Calabresi');
DRIVERS[32] = createDriverObject('IZU', 'Naota', 'Izum');
DRIVERS[33] = createDriverObject('CLA', 'Howard', 'Clarke');
DRIVERS[34] = createDriverObject('KAU', 'Wilheim', 'Kaufmann');
DRIVERS[35] = createDriverObject('LAU', 'Marie', 'Laursen');
DRIVERS[36] = createDriverObject('NIE', 'Flavio', 'Nieves');
DRIVERS[58] = createDriverObject('LEC', 'Charles', 'Leclerc');
DRIVERS[59] = createDriverObject('GAS', 'Pierre', 'Gasly');
DRIVERS[60] = createDriverObject('HAR', 'Brendan', 'Hatley');
DRIVERS[61] = createDriverObject('SIR', 'Sergey', 'Sirotkin');

export default DRIVERS;