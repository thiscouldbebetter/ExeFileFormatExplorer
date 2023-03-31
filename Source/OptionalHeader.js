
class OptionalHeader
{
	constructor
	(
		executableType,
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
	)
	{
		this.executableType = executableType;
		this.majorLinkerVersion = majorLinkerVersion;
		this.minorLinkerVersion = minorLinkerVersion;
		this.sizeOfCode = sizeOfCode;
		this.sizeOfUninitializedData = sizeOfUninitializedData;
		this.sizeOfInitializedData = sizeOfInitializedData;
		this.addressOfEntryPoint = addressOfEntryPoint;
		this.baseOfCode = baseOfCode;
		this.baseOfData = baseOfData;

		this.imageBase = imageBase;
		this.sectionAlignment = sectionAlignment;
		this.fileAlignment = fileAlignment;
		this.majorOSVersion = majorOSVersion;
		this.minorOSVersion = minorOSVersion;
		this.majorImageVersion = majorImageVersion;
		this.minorImageVersion = minorImageVersion;
		this.majorSubsystemVersion = majorSubsystemVersion;
		this.minorSubsystemVersion = minorSubsystemVersion;
		this.reserved = reserved;
		this.sizeOfImage = sizeOfImage;
		this.sizeOfHeaders = sizeOfHeaders;
		this.checksum = checksum;
		this.subsystem = subsystem;
		this.dllCharacteristics = dllCharacteristics;
		this.sizeOfStackReserve = sizeOfStackReserve;
		this.sizeOfStackCommit = sizeOfStackCommit;
		this.sizeOfHeapReserve = sizeOfHeapReserve;
		this.sizeOfHeapCommit = sizeOfHeapCommit;
		this.loaderFlags = loaderFlags;
		this.numberOfRVAAndSizes = numberOfRVAAndSizes;
	}
}
