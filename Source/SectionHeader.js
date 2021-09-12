
class SectionHeader
{
	constructor
	(
		ansiName,
		misc,
		virtualAddress,
		sizeOfRawData,
		pointerToRawData,
		pointerToRelocations,
		pointerToLineNumbers,
		numberOfRelocations,
		numberOfLineNumbers,
		characteristics
	)
	{
		this.ansiName = ansiName;
		this.misc = misc;
		this.virtualAddress = virtualAddress;
		this.sizeOfRawData = sizeOfRawData;
		this.pointerToRawData = pointerToRawData;
		this.pointerToRelocations = pointerToRelocations;
		this.pointerToLineNumbers = pointerToLineNumbers;
		this.numberOfRelocations = numberOfRelocations;
		this.numberOfLineNumbers = numberOfLineNumbers;
		this.characteristics = characteristics;
	}
}
