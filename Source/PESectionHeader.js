
class PESectionHeader
{
	constructor
	(
		peString,
		machine,
		numberOfSections,
		timeCreatedInSecondsSince1969,
		pointerToSymbolTable,
		numberOfSymbols,
		sizeOfOptionalHeader,
		characteristics
	)
	{
		this.peString = peString;
		this.machine = machine = machine;
		this.numberOfSections = numberOfSections;
		this.timeCreatedInSecondsSince1969 = timeCreatedInSecondsSince1969; // Reportedly, since Windows 10, this is usually nonsense.
		this.pointerToSymbolTable = pointerToSymbolTable;
		this.numberOfSymbols = numberOfSymbols;
		this.sizeOfOptionalHeader = sizeOfOptionalHeader;
		this.characteristics = characteristics;
	}
}
