
class ExeFile
{
	constructor(filePath)
	{
		this.filePath = filePath;
	}

	static BitsPerByte = 8;

	// static methods

	static fromFilePathAndBytes(filePath, bytesFromFile)
	{
		var reader = new ByteStreamLittleEndian(bytesFromFile);

		var returnValue = new ExeFile(filePath);
		returnValue.readFromFilePath_ReadAll(reader);

		return returnValue;
	}

	readFromFilePath_ReadAll(reader)
	{
		// File specification obtained from www.oldschoolhack.de

		this.readFromFilePath_ReadMZSection(reader);
		this.readFromFilePath_ReadPESectionHeader(reader);
		this.readFromFilePath_ReadOptionalHeader(reader);
		this.readFromFilePath_ReadVirtualAddresses(reader);
		this.readFromFilePath_ReadSectionHeaders(reader);
	}

	readFromFilePath_ReadMZSection(reader)
	{
		// MZ section (an MS-DOS program, usually a "stub").
		// "MZ" are reportedly the initials of an early MS-DOS developer.

		var mzString = reader.readString(2); // 0x00
		var numberOfBytesOnLastPageOfFile = reader.readShort(); // 0x02
		var numberOfPagesInFile = reader.readShort(); // 0x04
		var relocations = reader.readShort(); // 0x06
		var sizeOfHeaderInParagraphs = reader.readShort(); // 0x08
		var minimumExtraParagraphsNeeded = reader.readShort(); // 0x0A
		var maximumExtraParagraphsNeeded = reader.readShort(); // 0x0C
		var initialRelativeSSValue = reader.readShort(); // 0x0E
		var initialSPValue = reader.readShort(); // 0x10
		var checksum = reader.readShort(); // 0x12
		var initialIPValue = reader.readShort(); // 0x14
		var initialRelativeCSValue = reader.readShort(); // 0x16
		var fileAddressOfRelocationTable = reader.readShort(); // 0x18
		var overlayNumber = reader.readShort(); // 0x1A
		var reserved0 = reader.readBytesAsHexadecimal(8); // 0x1C
		var oemIdentifier = reader.readShort(); // 0x24
		var oemInformation = reader.readShort(); // 0x26
		var reserved1 = reader.readBytesAsHexadecimal(20); // 0x28
		var addressOfPEHeader = reader.readInt(); // 0x3C

		var sizeOfMZSectionHeaderInBytes = 64;
		var numberOfBytesInMZSectionBody = addressOfPEHeader - sizeOfMZSectionHeaderInBytes;
		var bodyBytesAsHexadecimal =
			reader.readBytesAsHexadecimal(numberOfBytesInMZSectionBody);

		this.mzSection = new MZSection
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
		);
	}

	readFromFilePath_ReadPESectionHeader(reader)
	{
		// PE ("Portable Executable") section header.

		var peString = reader.readString(4);
		var machine = reader.readShort();
		var numberOfSections = reader.readShort();
		var timeDateStamp = reader.readInt();
		var pointerToSymbolTable = reader.readInt();
		var numberOfSymbols = reader.readInt();
		var sizeOfOptionalHeader = reader.readShort();
		var characteristics = reader.readShort();

		this.peSectionHeader = new PESectionHeader
		(
			peString,
			machine,
			numberOfSections,
			timeDateStamp,
			pointerToSymbolTable,
			numberOfSymbols,
			sizeOfOptionalHeader,
			characteristics
		);
	}

	readFromFilePath_ReadOptionalHeader(reader)
	{
		var magicNumber = reader.readShort(); // 0x18
		var majorLinkerVersion = reader.readByte(); // 0x1A
		var minorLinkerVersion = reader.readByte(); // 0x1B
		var sizeOfCode = reader.readInt(); // 0x1C
		var sizeOfInitializedData = reader.readInt(); // 0x20
		var sizeOfUninitializedData = reader.readInt(); // 0x24
		var addressOfEntryPoint = reader.readInt(); // 0x28
		var baseOfCode = reader.readInt(); // 0x2C
		var baseOfData = reader.readInt(); // 0x30
		var imageBase = reader.readInt(); // 0x34
		var sectionAlignment = reader.readInt(); // 0x38
		var fileAlignment = reader.readInt(); // 0x3C
		var majorOSVersion = reader.readShort(); // 0x40
		var minorOSVersion = reader.readShort(); // 0x42
		var majorImageVersion = reader.readShort(); // 0x44
		var minorImageVersion = reader.readShort(); // 0x46
		var majorSubsystemVersion = reader.readShort(); // 0x48
		var minorSubsystemVersion = reader.readShort(); // 0x4A
		var reserved = reader.readInt(); // 0x4C
		var sizeOfImage = reader.readInt(); // 0x50
		var sizeOfHeaders = reader.readInt(); // 0x54
		var checksum = reader.readInt(); // 0x58
		var subsystem = reader.readShort(); // 0x5C
		var dllCharacteristics = reader.readShort(); // 0x5E
		var sizeOfStackReserve = reader.readInt(); // 0x60
		var sizeOfStackCommit = reader.readInt(); // 0x64
		var sizeOfHeapReserve = reader.readInt(); // 0x68
		var sizeOfHeapCommit = reader.readInt(); // 0x6C
		var loaderFlags = reader.readInt(); // 0x70
		var numberOfRVAAndSizes = reader.readInt(); // 0x74

		this.optionalHeader = new OptionalHeader
		(
			magicNumber,
			majorLinkerVersion,
			minorLinkerVersion,
			sizeOfCode,
			sizeOfInitializedData,
			sizeOfUninitializedData,
			addressOfEntryPoint,
			baseOfCode,
			baseOfData,

			imageBase,
			sectionAlignment,
			fileAlignment,
			majorOSVersion,
			minorOSVersion,
			majorImageVersion,
			minorImageVersion,
			majorSubsystemVersion,
			minorSubsystemVersion,
			reserved,
			sizeOfImage,
			sizeOfHeaders,
			checksum,
			subsystem,
			dllCharacteristics,
			sizeOfStackReserve,
			sizeOfStackCommit,
			sizeOfHeapReserve,
			sizeOfHeapCommit,
			loaderFlags,
			numberOfRVAAndSizes
		);
	}

	readFromFilePath_ReadVirtualAddresses(reader)
	{
		// IMAGE_DATA_DIRECTORY DataDirectory[IMAGE_NUMBEROF_DIRECTORY_ENTRIES];
		// IMAGE_NUMBEROF_DIRECTORY_ENTRIES = 16

		var vas = VirtualAddressAndSize;

		var exportDirectory =
			new vas(reader.readInt(), reader.readInt());
		var importDirectory =
			new vas(reader.readInt(), reader.readInt());
		var resourceDirectory =
			new vas(reader.readInt(), reader.readInt());
		var exceptionDirectory =
			new vas(reader.readInt(), reader.readInt());
		var securityDirectory =
			new vas(reader.readInt(), reader.readInt());
		var baseRelocationTable =
			new vas(reader.readInt(), reader.readInt());
		var debugDirectory =
			new vas(reader.readInt(), reader.readInt());
		var architectureSpecificData =
			new vas(reader.readInt(), reader.readInt());
		var rvaOfGP =
			new vas(reader.readInt(), reader.readInt());
		var tlsDirectory =
			new vas(reader.readInt(), reader.readInt());
		var loadConfigurationDirectory =
			new vas(reader.readInt(), reader.readInt());
		var boundImportDirectory =
			new vas(reader.readInt(), reader.readInt());
		var importAddressTable =
			new vas(reader.readInt(), reader.readInt());
		var delayLoadImportDescriptors =
			new vas(reader.readInt(), reader.readInt());
		var comRuntimeDescriptor =
			new vas(reader.readInt(), reader.readInt());
		var zeroes = reader.readBytesAsHexadecimal(8);

		this.virtualAddresses = new VirtualAddresses
		(
			exportDirectory,
			importDirectory,
			resourceDirectory,
			exceptionDirectory,
			securityDirectory,
			baseRelocationTable,
			debugDirectory,
			architectureSpecificData,
			rvaOfGP,
			tlsDirectory,
			loadConfigurationDirectory,
			boundImportDirectory,
			importAddressTable,
			delayLoadImportDescriptors,
			comRuntimeDescriptor,
			zeroes
		);
	}

	readFromFilePath_ReadSectionHeaders(reader)
	{
		var returnValues = [];

		for (var s = 0; s < this.peSectionHeader.numberOfSections; s++)
		{
			var ansiName = reader.readBytesAsHexadecimal(8); // 0x00
			var misc = reader.readInt(); // 0x08
			var virtualAddress = reader.readInt(); // 0x0C
			var sizeOfRawData = reader.readInt(); // 0x10
			var pointerToRawData = reader.readInt(); // 0x14
			var pointerToRelocations = reader.readInt(); // 0x18
			var pointerToLineNumbers = reader.readInt(); // 0x1C
			var numberOfRelocations = reader.readShort(); // 0x20
			var numberOfLineNumbers = reader.readShort(); // 0x22
			var characteristics = reader.readInt(); // 0x24

			var sectionHeader = new SectionHeader
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
			);

			returnValues.push(sectionHeader);
		}

		this.sectionHeaders = returnValues;
	}
}
