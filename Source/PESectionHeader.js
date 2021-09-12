
class PESectionHeader
{
	constructor
	(
		peString,
		machine,
		numberOfSections,
		timeDateStamp,
		pointerToSymbolTable,
		numberOfSymbols,
		sizeOfOptionalHeader,
		characteristics
	)
	{
		this.peString = peString;
		this.machine = machine = machine;
		this.numberOfSections = numberOfSections;
		this.timeDateStamp = timeDateStamp;
		this.pointerToSymbolTable = pointerToSymbolTable;
		this.numberOfSymbols = numberOfSymbols;
		this.sizeOfOptionalHeader = sizeOfOptionalHeader;
		this.characteristics = characteristics;
	}
}
