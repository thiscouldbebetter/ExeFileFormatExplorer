
class SectionFlags
{
	constructor
	(
		reserved0,
		reserved1,
		reserved2,
		reserved3,
		shouldNotBePaddedToNextBoundary, // TYPE_NO_PAD.  Obsoleted by ALIGN_1BYTES.
		reserved4, 
		containsExecutableCode, // CNT_CODE.
		containsInitializedData, // CNT_INITIALIZED_DATA.
		containsUninitializedData, // CNT_UNINITIALIZED_DATA.
		reserved5, // LNK_OTHER.
		containsCommentsOrOtherInfo, // LNK_INFO. 
		reserved6,
		willNotBecomePartOfImage, // LNK_REMOVE.
		containsComdatData, // LNK_COMDAT - todo - What is "COMDAT"?
		containsDataReferencedThroughGlobalPointer, // GPREL.
		reserved7, // MEM_PURGEABLE.
		reserved8, // MEM_16BIT.
		reserved9, // MEM_LOCKED.
		reserved10, // MEM_PRELOAD.
		byteBoundaryToAlignDataOn,
		containsExtendedRelocations, // LNK_NRELOC_OVFL.
		canBeDiscardedAsNeeded, // MEM_DISCARDABLE.
		cannotBeCached, // MEM_NOT_CACHED.
		isNotPageable, // MEM_NOT_PAGED.
		canBeSharedInMemory, // MEM_SHARED.
		canBeExecutedAsCode, // MEM_EXECUTE.
		canBeRead, // MEM_READ
		canBeWrittenTo // MEM_WRITE
	)
	{
		this.reserved0 = reserved0;
		this.reserved1 = reserved1;
		this.reserved2 = reserved2;
		this.reserved3 = reserved3;
		this.shouldNotBePaddedToNextBoundary = shouldNotBePaddedToNextBoundary;
		this.reserved4 = reserved4; 
		this.containsExecutableCode = containsExecutableCode;
		this.containsInitializedData = containsInitializedData;
		this.containsUninitializedData = containsUninitializedData;
		this.reserved5 = reserved5;
		this.containsCommentsOrOtherInfo = containsCommentsOrOtherInfo;
		this.reserved6 = reserved6;
		this.willNotBecomePartOfImage = willNotBecomePartOfImage;
		this.containsComdatData = containsComdatData;
		this.containsDataReferencedThroughGlobalPointer = containsDataReferencedThroughGlobalPointer;
		this.reserved7 = reserved7;
		this.reserved8 = reserved8;
		this.reserved9 = reserved9;
		this.reserved10 = reserved10;
		this.byteBoundaryToAlignDataOn = byteBoundaryToAlignDataOn;
		this.containsExtendedRelocations = containsExtendedRelocations;
		this.canBeDiscardedAsNeeded = canBeDiscardedAsNeeded;
		this.cannotBeCached = cannotBeCached;
		this.isNotPageable = isNotPageable;
		this.canBeSharedInMemory = canBeSharedInMemory;
		this.canBeExecutedAsCode = canBeExecutedAsCode;
		this.canBeRead = canBeRead;
		this.canBeWrittenTo = canBeWrittenTo
	}

	static fromBytes(bytesToParse)
	{
		var byteToParse = bytesToParse[0];
		var reserved0 = (byteToParse >> 0) & 1;
		var reserved1 = (byteToParse >> 1) & 1;
		var reserved2 = (byteToParse >> 2) & 1;
		var reserved3 = (byteToParse >> 3) & 1;
		var shouldNotBePaddedToNextBoundary = (byteToParse >> 4) & 1;
		var reserved4 = (byteToParse >> 5) & 1;
		var containsExecutableCode = (byteToParse >> 6) & 1;
		var containsInitializedData = (byteToParse >> 7) & 1;

		byteToParse = bytesToParse[1];
		var containsUninitializedData = (byteToParse >> 0) & 1;
		var reserved5 = (byteToParse >> 1) & 1;
		var containsCommentsOrOtherInfo = (byteToParse >> 2) & 1;
		var reserved6 = (byteToParse >> 3) & 1;
		var willNotBecomePartOfImage = (byteToParse >> 4) & 1;
		var containsComdatData = (byteToParse >> 5) & 1;
		var containsDataReferencedThroughGlobalPointer = (byteToParse >> 6) & 1;
		var reserved7 = (byteToParse >> 7) & 1;

		byteToParse = bytesToParse[2];
		var reserved8 = (byteToParse >> 0) & 1;
		var reserved9 = (byteToParse >> 1) & 1;
		var reserved10 = (byteToParse >> 2) & 1;

		var nibbleForAlignment = (byteToParse >> 4) && 0xF;
		var byteBoundaryToAlignDataOn = Math.pow(2, nibbleForAlignment - 1); // Not sure if this should ever be zero.

		byteToParse = bytesToParse[3];
		var containsExtendedRelocations = (byteToParse >> 0) & 1;
		var canBeDiscardedAsNeeded = (byteToParse >> 1) & 1;
		var cannotBeCached = (byteToParse >> 2) & 1;
		var isNotPageable = (byteToParse >> 3) & 1;
		var canBeSharedInMemory = (byteToParse >> 4) & 1;
		var canBeExecutedAsCode = (byteToParse >> 5) & 1;
		var canBeRead = (byteToParse >> 6) & 1;
		var canBeWrittenTo = (byteToParse >> 7) & 1;

		return new SectionFlags
		(
			reserved0,
			reserved1,
			reserved2,
			reserved3,
			shouldNotBePaddedToNextBoundary,
			reserved4,
			containsExecutableCode,
			containsInitializedData,
			containsUninitializedData,
			reserved5,
			containsCommentsOrOtherInfo,
			reserved6,
			willNotBecomePartOfImage,
			containsComdatData,
			containsDataReferencedThroughGlobalPointer,
			reserved7,
			reserved8,
			reserved9,
			reserved10,
			byteBoundaryToAlignDataOn,
			containsExtendedRelocations,
			canBeDiscardedAsNeeded,
			cannotBeCached,
			isNotPageable,
			canBeSharedInMemory,
			canBeExecutedAsCode,
			canBeRead,
			canBeWrittenTo
		)
	}
}
