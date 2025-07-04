class SupportedNodeType:
    """
    Supported Node Type
    """

    Group = "Group"
    LogicStart = "LogicStart"
    LogicEnd = "LogicEnd"
    LogicCondition = "LogicCondition"
    LogicDatasetInput = "LogicDatasetInput"
    LogicDatasetOutput = "LogicDatasetOutput"

    @classmethod
    @property
    def values(cls):
        return [
            cls.Group,
            cls.LogicStart,
            cls.LogicEnd,
            cls.LogicCondition,
            cls.LogicDatasetInput,
            cls.LogicDatasetOutput,
        ]
