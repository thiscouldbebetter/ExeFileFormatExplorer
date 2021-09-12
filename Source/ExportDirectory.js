
class ExportDirectory
{
	constructor
	(
		characteristics,
		timeDateStamp,
		majorVersion,
		minorVersion,
		name,
		base,
		numberOfFunctions,
		numberOfNames,
		addressOfFunctions,
		addressOfNames,
		addressOfNameOrdinals
	)
	{
		this.characteristics = characteristics;
		this.timeDateStamp = timeDateStamp;
		this.majorVersion = majorVersion;
		this.minorVersion = minorVersion;
		this.name = name;
		this.base = base;
		this.numberOfFunctions = numberOfFunctions;
		this.numberOfNames = numberOfNames;
		this.addressOfFunctions = addressOfFunctions;
		this.addressOfNames = addressOfNames;
		this.addressOfNameOrdinals = addressOfNameOrdinals;
	}
}
