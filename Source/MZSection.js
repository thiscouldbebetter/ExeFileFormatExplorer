
class MZSection
{
	constructor
	(
		mzString,
		numberOfBytesOnLastPageOfFile,
		numberOfPagesInFile,
		relocations,
		sizeOfHeaderInParagraphs,
		minimumExtraParagraphsNeeded,
		maximumExtraParagraphsNeeded,
		initialRelativeSSValue,
		initialSPValue,
		checksum,
		initialIPValue,
		initialRelativeCSValue,
		fileAddressOfRelocationTable,
		overlayNumber,
		reserved0,
		oemIdentifier,
		oemInformation,
		reserved1,
		addressOfPEHeader,
		bodyBytesAsHexadecimal
	)
	{
		this.mzString = mzString;
		this.numberOfBytesOnLastPageOfFile = numberOfBytesOnLastPageOfFile;
		this.numberOfPagesInFile = numberOfPagesInFile;
		this.relocations = relocations;
		this.sizeOfHeaderInParagraphs = sizeOfHeaderInParagraphs;
		this.minimumExtraParagraphsNeeded = minimumExtraParagraphsNeeded;
		this.maximumExtraParagraphsNeeded = maximumExtraParagraphsNeeded;
		this.initialRelativeSSValue = initialRelativeSSValue;
		this.initialSPValue = initialSPValue;
		this.checksum = checksum;
		this.initialIPValue = initialIPValue;
		this.initialRelativeCSValue = initialRelativeCSValue;
		this.fileAddressOfRelocationTable = fileAddressOfRelocationTable;
		this.overlayNumber = overlayNumber;
		this.reserved0 = reserved0;
		this.oemIdentifier = oemIdentifier;
		this.oemInformation = oemInformation;
		this.reserved1 = reserved1;
		this.addressOfPEHeader = addressOfPEHeader;

		this.bodyBytesAsHexadecimal = bodyBytesAsHexadecimal;
	}
}
