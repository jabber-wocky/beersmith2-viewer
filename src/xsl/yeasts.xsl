<?xml version="1.0" encoding="iso-8859-1"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

    <xsl:template match="/">
        <h2>Yeast</h2>
        <table class="table">
            <thead>
                <tr>
                    <th>Name (Product ID)</th>
                    <th>Lab</th>
                    <th>Type</th>
                    <th>Form</th>
                    <th>Inventory</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>
                <xsl:for-each select="//Yeast[boolean(./F_Y_NAME) and ./F_Y_INVENTORY != 0.0000000]">
                    <xsl:sort select="./F_Y_NAME" />

                    <tr>
                        <td><xsl:value-of select="F_Y_NAME" /> (<xsl:value-of select="F_Y_PRODUCT_ID" />)</td>
                        <td><xsl:value-of select="F_Y_LAB" /></td>
                        <td>
                            <xsl:choose>
                                <xsl:when test="F_Y_TYPE = 0">Ale</xsl:when>
                                <xsl:when test="F_Y_TYPE = 1">Lager</xsl:when>
                                <xsl:when test="F_Y_TYPE = 2">Wine</xsl:when>
                                <xsl:when test="F_Y_TYPE = 3">Champagne</xsl:when>
                                <xsl:when test="F_Y_TYPE = 4">Wheat</xsl:when>
                                <xsl:otherwise></xsl:otherwise>
                            </xsl:choose>
                        </td>
                        <td>
                            <xsl:choose>
                                <xsl:when test="F_Y_FORM = 0">Liquid</xsl:when>
                                <xsl:when test="F_Y_FORM = 1">Dry</xsl:when>
                                <xsl:when test="F_Y_FORM = 2">Slant</xsl:when>
                                <xsl:when test="F_Y_FORM = 3">Culture</xsl:when>
                                <xsl:otherwise></xsl:otherwise>
                            </xsl:choose>
                        </td>
                        <td><xsl:value-of select="format-number(round(F_Y_INVENTORY*10) div 10, '##0.0')" /> pkgs</td>
                        <td><xsl:value-of select="format-number(round(F_Y_PRICE*100) div 100, '##0.00')" /> $/pkg</td>
                    </tr>
                </xsl:for-each>
            </tbody>
        </table>
    </xsl:template>
</xsl:stylesheet>